// Types for dashboard components

export interface BarChartProps {
  readonly currentYear: readonly number[];
  readonly previousYear?: readonly number[];
  readonly labels?: readonly string[];
}

export interface BatteryChartProps {
  readonly healthy: number;
  readonly risky: number;
  readonly unhealthy: number;
}

export interface GaugeChartProps {
  readonly label: string;
  readonly value: number;
  readonly max: number;
}
