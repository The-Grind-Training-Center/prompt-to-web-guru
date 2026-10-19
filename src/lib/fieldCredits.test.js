import { describe, expect, test } from "bun:test";
import { FIELD_CREDIT_TIERS, SET_DAYS_HOURLY_RATE, FIELD_BOOKING_WINDOW_WEEKS } from "./fieldCredits";
import { getSiteDeals } from "./siteDeals";

describe("field pricing rules", () => {
  test("1 to 5 credits cost $125 per hour", () => {
    expect(FIELD_CREDIT_TIERS[0]).toEqual({ min: 1, max: 5, hourlyRate: 125 });
  });
  test("6 to 10 credits cost $115 per hour", () => {
    expect(FIELD_CREDIT_TIERS[1]).toEqual({ min: 6, max: 10, hourlyRate: 115 });
  });
  test("11 or more credits cost $105 per hour", () => {
    expect(FIELD_CREDIT_TIERS[2]).toEqual({ min: 11, max: Infinity, hourlyRate: 105 });
  });
  test("set days cost $125 per hour", () => {
    expect(SET_DAYS_HOURLY_RATE).toBe(125);
  });
  test("credit holders can book up to two weeks ahead", () => {
    expect(FIELD_BOOKING_WINDOW_WEEKS).toBe(2);
  });
  test("membership deal remains active through November 1 Chicago time", () => {
    expect(getSiteDeals(new Date("2026-11-02T05:59:59Z")).membershipOn).toBe(true);
    expect(getSiteDeals(new Date("2026-11-02T06:00:00Z")).membershipOn).toBe(false);
  });
});