type GoogleAdsTracking = {
  clickIds: () => { gclid: string | null; gbraid: string | null; wbraid: string | null };
  conversion: (eventId: string) => void;
  optedOut: () => boolean;
  optOut: () => void;
};

declare global {
  interface Window {
    grindGoogleAds?: GoogleAdsTracking;
  }
}

export function getGoogleClickIds() {
  try {
    return window.grindGoogleAds?.clickIds() ?? { gclid: null, gbraid: null, wbraid: null };
  } catch {
    return { gclid: null, gbraid: null, wbraid: null };
  }
}

export function trackGoogleLead(eventId: string) {
  try {
    window.grindGoogleAds?.conversion(eventId);
  } catch {
    // Tracking must never interrupt the form.
  }
}