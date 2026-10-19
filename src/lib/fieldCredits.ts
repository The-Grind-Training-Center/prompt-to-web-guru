export const FIELD_CREDIT_TIERS = [
  { min: 1, max: 5, hourlyRate: 125 },
  { min: 6, max: 10, hourlyRate: 115 },
  { min: 11, max: Infinity, hourlyRate: 105 },
] as const;

export const SET_DAYS_HOURLY_RATE = 125;
export const FIELD_BOOKING_WINDOW_WEEKS = 2;