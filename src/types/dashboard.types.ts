export interface BarChartProps {
  currentYear: number[];
  previousYear?: number[];
  labels?: string[];
}

export const DEFAULT_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export interface GaugeChartProps {
  label: string;
  value: number;
  max: number;
}

export interface BatteryChartProps {
  healthy: number;
  risky: number;
  unhealthy: number;
}
export interface DashboardData {
  current: number[];
  previous: number[];
  voltageHarmonics: number;
  healthy: number;
  risky: number;
  unhealthy: number;
}

export enum StepHealth {
  Healthy = 'Healthy Steps',
  Risky = 'Risky Steps',
  Unhealthy = 'Unhealthy Steps',
}

export interface DashboardMetrics {
  voltageHarmonics: number;
  healthy: number;
  risky: number;
  unhealthy: number;
}