import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const snippet = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!snippet) throw new Error("Google tracking initialization missing");
const DAY = 24 * 60 * 60 * 1000;

async function setup({ region = "US", search = "", values = new Map(), existingTag = false, failed = false, optOut = false } = {}) {
  let now = 1000000000000;
  const calls = [];
  const scripts = existingTag ? [{ src: "https://www.googletagmanager.com/gtag/js?id=G-EXISTING" }] : [];
  const listeners = {};
  const window = {
    location: { search },
    addEventListener: (name, callback) => { listeners[name] = callback; },
    ...(existingTag ? { dataLayer: [], gtag: (...args) => calls.push(args) } : {}),
  };
  const originalGtag = window.gtag;
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  runInNewContext(snippet, {
    window,
    document: { scripts, createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } },
    localStorage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) },
    navigator: { globalPrivacyControl: optOut },
    URLSearchParams, AbortController, Date: Clock, setTimeout, clearTimeout,
    fetch: async () => { if (failed) throw new Error("location unavailable"); return { ok: true, text: async () => `loc=${region}\n` }; },
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return { window, values, scripts, listeners, originalGtag, advance: (days) => { now += days * DAY; }, calls: () => existingTag ? calls : Array.from(window.dataLayer || [], (args) => Array.from(args)) };
}

describe("Google Ads tracking rules without form submissions", () => {
  test("Google click IDs persist for exactly 90 days and do not change fbclid", async () => {
    const state = await setup({ search: "?gclid=click-a&gbraid=braid-b&wbraid=braid-c&fbclid=facebook-original" });
    expect({ ...state.window.grindGoogleAds.clickIds() }).toEqual({ gclid: "click-a", gbraid: "braid-b", wbraid: "braid-c" });
    expect(state.values.has("fbclid")).toBe(false);
    state.advance(89);
    expect(state.window.grindGoogleAds.clickIds().gclid).toBe("click-a");
    state.advance(1);
    expect(state.window.grindGoogleAds.clickIds().gclid).toBeNull();
  });
  test("new click IDs overwrite only their own stored values", async () => {
    const first = await setup({ search: "?gclid=old&gbraid=keep" });
    const next = await setup({ search: "?gclid=new", values: first.values });
    expect({ ...next.window.grindGoogleAds.clickIds() }).toEqual({ gclid: "new", gbraid: "keep", wbraid: null });
  });
  test("the account tag loads asynchronously and converts once per event ID without user data", async () => {
    const state = await setup();
    expect(state.scripts).toEqual([{ async: true, src: "https://www.googletagmanager.com/gtag/js?id=AW-18513946476" }]);
    state.window.grindGoogleAds.conversion("same-meta-event-id");
    state.window.grindGoogleAds.conversion("same-meta-event-id");
    const events = state.calls().filter((args) => args[0] === "event");
    expect(events.length).toBe(1);
    expect({ ...events[0][2] }).toEqual({ send_to: "AW-18513946476/xx21CJ2Y46IdEOzOkfxE", transaction_id: "same-meta-event-id" });
    expect(state.calls().some((args) => args[1] === "user_data")).toBe(false);
  });
  test("an existing gtag and dataLayer are reused without another loader", async () => {
    const state = await setup({ existingTag: true });
    expect(state.window.gtag).toBe(state.originalGtag);
    expect(state.scripts.length).toBe(1);
    expect(state.calls().some((args) => args[0] === "config" && args[1] === "AW-18513946476")).toBe(true);
  });
  test("consent-required and unresolved regions have no tags, capture or conversion", async () => {
    for (const region of ["DE", "GB", "CH", "XX", "T1", "ZZ"]) {
      const state = await setup({ region, search: "?gclid=blocked" });
      state.window.grindGoogleAds.conversion("blocked-event");
      expect(state.scripts.length).toBe(0);
      expect(state.values.size).toBe(0);
      expect(state.calls().length).toBe(0);
    }
    const failed = await setup({ failed: true });
    expect(failed.scripts.length).toBe(0);
  });
  test("refusal and Global Privacy Control block Google tracking", async () => {
    const state = await setup({ search: "?gclid=remove" });
    state.window.grindGoogleAds.optOut();
    state.window.grindGoogleAds.conversion("refused-event");
    expect(state.values.has("grind_google_ads_click_ids")).toBe(false);
    expect(state.calls().some((args) => args[0] === "event")).toBe(false);
    const next = await setup({ values: state.values });
    expect(next.scripts.length).toBe(0);
    const gpc = await setup({ optOut: true });
    expect(gpc.scripts.length).toBe(0);
  });
  test("missing gtag never throws from a conversion", async () => {
    const state = await setup();
    delete state.window.gtag;
    expect(() => state.window.grindGoogleAds.conversion("event-without-tag")).not.toThrow();
  });
});