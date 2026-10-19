import { useEffect, useState } from "react";

export const getChicagoDate = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
};

export const getSiteDeals = (now = new Date()) => {
  const date = getChicagoDate(now);
  const membershipOn = date <= "2026-11-01";
  // Chicago is still on daylight saving time at midnight ending October 31.
  const daysLeft = Math.max(0, Math.ceil((Date.parse("2026-11-01T00:00:00-05:00") - now.getTime()) / 86_400_000));
  return { membershipOn, countdown: date >= "2026-10-31" ? "Last day" : `${daysLeft} days left` };
};

export function useSiteDeals() {
  const [deals, setDeals] = useState(() => getSiteDeals());
  useEffect(() => {
    const timer = window.setInterval(() => setDeals(getSiteDeals()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return deals;
}