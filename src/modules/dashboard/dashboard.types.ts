export interface DashboardData {
  voltageFluctuation: number;
  voltageHarmonics: number;
  currentHarmonics: number;
  generatorDemand: number;
  monthlyConsumption: {
    labels: string[];
    currentYear: number[];
    previousYear: number[];
  };
  stepHealth: {
    healthy: number;
    risky: number;
    unhealthy: number;
  };
}