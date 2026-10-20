type SourceInput = {
  utm_source?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_page?: string;
};

export function leadSource({ utm_source, utm_campaign, referrer, landing_page }: SourceInput): string {
  let source = utm_source?.trim() || "";
  if (!source && referrer) {
    try {
      const url = new URL(referrer);
      const host = url.hostname.toLowerCase().replace(/^www\./, "");
      if (["http:", "https:"].includes(url.protocol)) {
        if (/(^|\.)google\.(com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(host)) source = "google";
        else if (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com" || host.endsWith(".fb.com")) source = "facebook";
        else if (host === "instagram.com" || host.endsWith(".instagram.com")) source = "instagram";
        else source = host;
      }
    } catch {
      // Invalid referrers are treated as direct visits.
    }
  }
  // Keep untrusted values on one Telegram line.
  const oneLine = (value: string) => value.replace(/[\r\n\u2028\u2029]+/g, " ");
  return `${oneLine(source || "direct")} / ${oneLine(utm_campaign?.trim() || landing_page?.trim() || "/")}`;
}

export function telegramDetails(details: [string, string][]): [string, string][] {
  return details.filter(([label]) => label !== "Which do you want?");
}