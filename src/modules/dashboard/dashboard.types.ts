export interface BarChartProps {
  currentYear: number[];
  previousYear?: number[];
  labels?: string[];
}


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


export interface DashboardMetrics {
  voltageHarmonics: number;
  healthy: number;
  risky: number;
  unhealthy: number;
}