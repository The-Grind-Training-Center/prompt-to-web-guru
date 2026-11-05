import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const document = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const structuredData = document.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if (!structuredData) throw new Error("Facility structured data is missing");
const hours = JSON.parse(structuredData).openingHoursSpecification;
const forDay = (day) => hours.find((entry) => [entry.dayOfWeek].flat().includes(day));
const minutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

describe("facility operating hours", () => {
  test.each(["Monday", "Tuesday", "Wednesday", "Thursday"])("%s opens at noon and closes at 9 PM", (day) => {
    expect(minutes(forDay(day).opens)).toBe(12 * 60);
    expect(minutes(forDay(day).closes)).toBe(21 * 60);
  });
  test("Friday opens at 2 PM and closes at 8 PM", () => {
    expect(minutes(forDay("Friday").opens)).toBe(14 * 60);
    expect(minutes(forDay("Friday").closes)).toBe(20 * 60);
  });
  test("Saturday opens at 10 AM and closes at 5 PM", () => {
    expect(minutes(forDay("Saturday").opens)).toBe(10 * 60);
    expect(minutes(forDay("Saturday").closes)).toBe(17 * 60);
  });
  test("Sunday opens at 11 AM and closes at 8 PM", () => {
    expect(minutes(forDay("Sunday").opens)).toBe(11 * 60);
    expect(minutes(forDay("Sunday").closes)).toBe(20 * 60);
  });
});