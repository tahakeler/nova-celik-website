// src/constants/dashboard.constants.ts
export const MAX_VOLTAGE_HARMONICS = 20;

export enum StepHealth {
  Healthy = 'Healthy Steps',
  Risky = 'Risky Steps',
  Unhealthy = 'Unhealthy Steps',
}

export const DEFAULT_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export type MonthLabel = typeof DEFAULT_LABELS[number];
