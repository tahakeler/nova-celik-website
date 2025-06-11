'use client';

import DonutChart from './DonutChart';
import SpeedometerChart from './SpeedometerChart';
import HarmonicLineChart from './HarmonicLineChart';
import MonthlyBarChart from './MonthlyBarChart';
import MiniBarKPIs from './MiniBarKPIs';
import ConsumptionBarChart from './ConsumptionBarChart';
import type { DashboardData } from '@/modules/dashboard/parseDashboardData';

interface DashboardSectionProps {
  data?: DashboardData;
}

export default function DashboardSection({ data }: Readonly<DashboardSectionProps>) {
  if (!data) return null;

  return (
    <section className="max-w-screen-2xl mx-auto w-full px-4 py-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <DonutChart value={data.voltageHarmonics} label="Voltage Harmonics" unit="%" />
      <SpeedometerChart value={data.generatorDemand} max={100} label="Generator Demand" unit="%" />
      <HarmonicLineChart current={data.current} previous={data.previous} />
      <MonthlyBarChart current={data.current} previous={data.previous} />
      <MiniBarKPIs healthy={data.healthy} risky={data.risky} unhealthy={data.unhealthy} />
      <ConsumptionBarChart current={data.current} previous={data.previous} />
    </section>
  );
}
