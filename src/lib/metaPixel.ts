// Site-wide Meta pixel. Loaded once from App; PageView fires on every route change.
export const META_PIXEL_ID = "1070881342328617";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function loadMetaPixel() {
  if (window.fbq) return;
  const w = window as unknown as Record<string, unknown>;
  const fbq = function (...args: unknown[]) {
    (fbq.queue as unknown[]).push(args);
  } as { (...args: unknown[]): void; queue: unknown[]; loaded?: boolean; version?: string };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  w.fbq = fbq;
  w._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq!("init", META_PIXEL_ID);
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
}

export function trackLead(eventId: string) {
  window.fbq?.("track", "Lead", {}, { eventID: eventId });
}
