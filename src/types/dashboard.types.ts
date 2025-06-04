// Types for dashboard components

import type { MonthLabel } from '@/constants/dashboard.constants';

export interface BarChartProps {
  readonly currentYear: readonly number[];
  readonly previousYear?: readonly number[];
  readonly labels?: readonly MonthLabel[];
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
