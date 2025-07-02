'use client';

import ModernGaugeChart from './ModernGaugeChart';
import type { DashboardData } from '@/modules/dashboard/parseDashboardData';

interface DashboardSectionProps {
  data?: DashboardData;
}

export default function DashboardSection({ data }: Readonly<DashboardSectionProps>) {
  if (!data) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg shadow-md">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <ModernGaugeChart value={data.voltageHarmonics} />
        <ModernGaugeChart value={data.generatorDemand} />
        <ModernGaugeChart value={data.currentHarmonics} />
      </div>
      <div className="text-center">
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition"
        >
          View Full Dashboard
        </a>
      </div>
    </section>
  );
}
