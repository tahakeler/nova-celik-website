'use client';

import TestChart from './TestChart';
import type { DashboardData } from '@/modules/dashboard/parseDashboardData';

interface DashboardSectionProps {
  data?: DashboardData;
}

export default function DashboardSection({ data }: Readonly<DashboardSectionProps>) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <TestChart value={data.voltageHarmonics} label="Voltage Harmonics" unit="%" />
        <TestChart value={data.generatorDemand} label="Generator Demand" unit="%" />
        <TestChart value={data.currentHarmonics} label="Current Harmonics" unit="%" />
      </div>
      <div className="text-center">
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition"
        >
          View Full Dashboard
        </a>
      </div>
    </div>
  );
}
