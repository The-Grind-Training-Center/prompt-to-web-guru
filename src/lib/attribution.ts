const AD_KEY = "grind_attrib";
const ENTRY_KEY = "grind_entry";
const FIRST_KEY = "grind_first";
export type FirstTouch = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string;
  had_gclid: boolean;
  had_fbclid: boolean;
  at: string;
};
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"] as const;
type AdFields = Record<(typeof FIELDS)[number], string | null>;
type Entry = { referrer: string | null; landing_page: string };
type SavedAd = AdFields & { landing_page: string; timestamp: number };

function readStorage(kind: "localStorage" | "sessionStorage", key: string): unknown {
  try {
    return JSON.parse(window[kind].getItem(key) ?? "null");
  } catch {
    return null;
  }
}

function writeStorage(kind: "localStorage" | "sessionStorage", key: string, value: unknown) {
  try {
    window[kind].setItem(key, JSON.stringify(value));
  } catch {
    // Attribution must never interrupt browsing or a lead submission.
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function externalReferrer(): string | null {
  try {
    if (!document.referrer) return null;
    const url = new URL(document.referrer);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const ownHosts = [
      window.location.hostname.toLowerCase().replace(/^www\./, ""),
      "thegrindtrainingcenter.com",
      "thegrindtrainingcenter.lovable.app",
    ];
    return ownHosts.includes(host) || !["http:", "https:"].includes(url.protocol) ? null : document.referrer;
  } catch {
    return null;
  }
}

/** Capture arrival before the router can change the URL. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  try {
    if (window.localStorage.getItem(FIRST_KEY) === null) {
      writeStorage("localStorage", FIRST_KEY, {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        referrer: externalReferrer(),
        landing_page: window.location.pathname,
        had_gclid: ["gclid", "gbraid", "wbraid"].some((key) => params.has(key)),
        had_fbclid: params.has("fbclid"),
        at: new Date().toISOString(),
      } satisfies FirstTouch);
    }
  } catch {
    // First-visit tracking must never interrupt browsing.
  }
  if (FIELDS.some((field) => params.has(field))) {
    const ad = Object.fromEntries(FIELDS.map((field) => [field, params.get(field)]));
    writeStorage("localStorage", AD_KEY, { ...ad, landing_page: window.location.pathname, timestamp: Date.now() });
  }
  if (!isRecord(readStorage("sessionStorage", ENTRY_KEY))) {
    writeStorage("sessionStorage", ENTRY_KEY, { referrer: externalReferrer(), landing_page: window.location.pathname });
  }
}

export function getFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  const value = readStorage("localStorage", FIRST_KEY);
  if (!isRecord(value)
    || !["utm_source", "utm_medium", "utm_campaign", "referrer"].every((key) => value[key] === null || typeof value[key] === "string")
    || typeof value.landing_page !== "string" || typeof value.at !== "string"
    || typeof value.had_gclid !== "boolean" || typeof value.had_fbclid !== "boolean") return null;
  return value as FirstTouch;
}

export function getAttribution(): AdFields & Entry {
  const empty = Object.fromEntries(FIELDS.map((field) => [field, null])) as AdFields;
  if (typeof window === "undefined") return { ...empty, referrer: null, landing_page: "" };
  const params = new URLSearchParams(window.location.search);
  const stored = readStorage("localStorage", AD_KEY);
  const age = isRecord(stored) && typeof stored.timestamp === "number" ? Date.now() - stored.timestamp : MAX_AGE;
  const saved = isRecord(stored) && age >= 0 && age < MAX_AGE ? stored as Partial<SavedAd> : null;
  const ad = Object.fromEntries(FIELDS.map((field) => [field,
    params.has(field) ? params.get(field) : typeof saved?.[field] === "string" ? saved[field] : null,
  ])) as AdFields;
  const entry = readStorage("sessionStorage", ENTRY_KEY);
  return {
    ...ad,
    referrer: isRecord(entry) && typeof entry.referrer === "string" ? entry.referrer : null,
    landing_page: isRecord(entry) && typeof entry.landing_page === "string" ? entry.landing_page : window.location.pathname,
  };
}