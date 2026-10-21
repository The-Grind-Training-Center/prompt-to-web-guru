import { afterEach, describe, expect, test } from "bun:test";
import { captureAttribution, getAttribution, getFirstTouch } from "./attribution.ts";
import { leadSource, telegramDetails } from "../../supabase/functions/_shared/leadSource.ts";

const DAY = 86400000;
const originalNow = Date.now;
afterEach(() => { delete globalThis.window; delete globalThis.document; Date.now = originalNow; });

function setup(search = "", referrer = "https://www.google.com/search?q=training") {
  let now = 1800000000000;
  Date.now = () => now;
  const local = new Map();
  const session = new Map();
  const storage = (map) => ({ getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) });
  globalThis.window = {
    location: { search, pathname: "/rentals", hostname: "thegrindtrainingcenter.com" },
    localStorage: storage(local), sessionStorage: storage(session),
  };
  globalThis.document = { referrer };
  return { local, session, advance: (days) => { now += days * DAY; } };
}

describe("Lead attribution without submissions or notifications", () => {
  test("first visit saves the requested fields and an ISO timestamp", () => {
    setup("?utm_source=google&utm_medium=cpc&utm_campaign=field&gclid=click&fbclid=fb");
    captureAttribution();
    const first = getFirstTouch();
    expect(first).toEqual({ utm_source: "google", utm_medium: "cpc", utm_campaign: "field", referrer: document.referrer, landing_page: "/rentals", had_gclid: true, had_fbclid: true, at: first?.at });
    expect(new Date(first.at).toISOString()).toBe(first.at);
  });
  test("first touch never overwrites or expires after later arrivals", () => {
    const state = setup("?utm_source=facebook");
    captureAttribution();
    const original = getFirstTouch();
    state.advance(90);
    window.location.search = "?utm_source=google&gclid=new";
    window.location.pathname = "/cages";
    captureAttribution();
    expect(getFirstTouch()).toEqual(original);
    expect(getFirstTouch().utm_source).toBe("facebook");
  });
  test("each Google click ID presence is captured as had_gclid", () => {
    for (const id of ["gclid", "gbraid", "wbraid"]) {
      setup(`?${id}=click`, "");
      captureAttribution();
      expect(getFirstTouch().had_gclid).toBe(true);
    }
  });
  test("direct first visit has null source and referrer with false click flags", () => {
    setup("", "https://thegrindtrainingcenter.com/gallery");
    captureAttribution();
    expect(getFirstTouch()).toMatchObject({ utm_source: null, utm_medium: null, utm_campaign: null, referrer: null, landing_page: "/rentals", had_gclid: false, had_fbclid: false });
  });
  test("first-touch reads tolerate absent, corrupted and blocked storage", () => {
    const state = setup();
    expect(getFirstTouch()).toBeNull();
    state.local.set("grind_first", "bad json");
    captureAttribution();
    expect(state.local.get("grind_first")).toBe("bad json");
    expect(getFirstTouch()).toBeNull();
    Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
    expect(() => captureAttribution()).not.toThrow();
    expect(getFirstTouch()).toBeNull();
  });
  test("arrival stores all five tags, timestamp and landing path, surviving navigation", () => {
    const state = setup("?utm_source=facebook&utm_medium=paid&utm_campaign=winter&utm_content=field&fbclid=click-a");
    captureAttribution();
    expect(JSON.parse(state.local.get("grind_attrib"))).toEqual({ utm_source: "facebook", utm_medium: "paid", utm_campaign: "winter", utm_content: "field", fbclid: "click-a", landing_page: "/rentals", timestamp: Date.now() });
    window.location.search = "";
    window.location.pathname = "/cages";
    expect(getAttribution()).toEqual({ utm_source: "facebook", utm_medium: "paid", utm_campaign: "winter", utm_content: "field", fbclid: "click-a", referrer: document.referrer, landing_page: "/rentals" });
  });
  test("current URL fields win individually, including explicitly empty values", () => {
    setup("?utm_source=facebook&utm_campaign=winter&fbclid=old");
    captureAttribution();
    window.location.search = "?utm_source=instagram&fbclid=";
    expect(getAttribution().utm_source).toBe("instagram");
    expect(getAttribution().utm_campaign).toBe("winter");
    expect(getAttribution().fbclid).toBe("");
  });
  test("a newer tagged arrival replaces the old campaign rather than mixing visits", () => {
    setup("?utm_source=facebook&utm_campaign=old&fbclid=old");
    captureAttribution();
    window.location.search = "?utm_source=google";
    captureAttribution();
    window.location.search = "";
    expect(getAttribution().utm_source).toBe("google");
    expect(getAttribution().utm_campaign).toBeNull();
    expect(getAttribution().fbclid).toBeNull();
  });
  test("saved ad attribution expires at exactly 30 days, session entry stays", () => {
    const state = setup("?fbclid=click-a");
    captureAttribution();
    window.location.search = "";
    state.advance(29);
    expect(getAttribution().fbclid).toBe("click-a");
    state.advance(1);
    expect(getAttribution().fbclid).toBeNull();
    expect(getAttribution().landing_page).toBe("/rentals");
  });
  test("session entry is captured only once, even across page reloads", () => {
    setup();
    captureAttribution();
    document.referrer = "https://instagram.com/";
    window.location.pathname = "/backstop";
    captureAttribution();
    expect(getAttribution().referrer).toBe("https://www.google.com/search?q=training");
    expect(getAttribution().landing_page).toBe("/rentals");
    window.sessionStorage = { getItem: () => null, setItem: () => {} };
    expect(getAttribution().landing_page).toBe("/backstop");
  });
  test("own domains and invalid referrers are not stored as external sources", () => {
    for (const referrer of ["https://www.thegrindtrainingcenter.com/gallery", "https://thegrindtrainingcenter.com/", "https://thegrindtrainingcenter.lovable.app/", "not a URL", ""]) {
      setup("", referrer);
      captureAttribution();
      expect(getAttribution().referrer).toBeNull();
    }
  });
  test("blocked storage and corrupted values cannot break capture or reads", () => {
    setup("?utm_source=google");
    for (const kind of ["localStorage", "sessionStorage"]) {
      Object.defineProperty(window, kind, { get() { throw new Error("blocked"); } });
    }
    expect(() => captureAttribution()).not.toThrow();
    expect(getAttribution().utm_source).toBe("google");
    const state = setup();
    state.local.set("grind_attrib", "invalid json");
    state.session.set("grind_entry", "null");
    expect(() => captureAttribution()).not.toThrow();
    expect(getAttribution().fbclid).toBeNull();
  });
  test("explicit UTM source and campaign take priority over entry fallbacks", () => {
    expect(leadSource({ utm_source: "paid-social", utm_campaign: "winter", referrer: "https://google.com", landing_page: "/rentals" })).toBe("paid-social / winter");
  });
  test("referrer domains resolve Google, Facebook, Instagram, other sites or direct", () => {
    for (const [host, expected] of [["www.google.com", "google"], ["google.co.uk", "google"], ["facebook.com", "facebook"], ["fb.com", "facebook"], ["m.facebook.com", "facebook"], ["l.facebook.com", "facebook"], ["instagram.com", "instagram"], ["l.instagram.com", "instagram"], ["www.localteam.org", "localteam.org"], ["google.com.evil.org", "google.com.evil.org"]]) {
      expect(leadSource({ referrer: `https://${host}/`, landing_page: "/rentals" })).toBe(`${expected} / /rentals`);
    }
    expect(leadSource({ landing_page: "/backstop" })).toBe("direct / /backstop");
    expect(leadSource({ referrer: "invalid", landing_page: "/rentals" })).toBe("direct / /rentals");
  });
  test("Telegram excludes only the plan answer without changing saved details", () => {
    const details = [["Which do you want?", "Set days (first pick)"], ["Team name", "Tigers"], ["Days and times you want", "Monday"]];
    expect(telegramDetails(details)).toEqual([["Team name", "Tigers"], ["Days and times you want", "Monday"]]);
    expect(details.length).toBe(3);
  });
  test("source formatting cannot add Telegram lines", () => {
    expect(leadSource({ utm_source: "google\nextra", utm_campaign: "winter\r\nextra" })).toBe("google extra / winter extra");
  });
});