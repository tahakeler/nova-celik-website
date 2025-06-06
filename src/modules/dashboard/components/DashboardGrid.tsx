'use client';

import GaugeMeter from './GaugeMeter';
import FacilityManagementCard from './FacilityManagementCard';
import ComparisonCard from './ComparisonCard';
import type { DashboardData } from '../dashboard.types';

interface DashboardGridProps {
  readonly metrics: DashboardData;
}

export default function DashboardGrid({ metrics }: Readonly<DashboardGridProps>) {
  const getVoltageHarmonicsType = () => {
    if (metrics.voltageHarmonics < 5) return 'healthy';
    if (metrics.voltageHarmonics < 10) return 'risky';
    return 'unhealthy';
  };

  const getCurrentHarmonicsType = () => {
    if (metrics.risky < 2) return 'healthy';
    if (metrics.risky < 5) return 'risky';
    return 'unhealthy';
  };

  const voltageHarmonicsType = getVoltageHarmonicsType();
  const currentHarmonicsType = getCurrentHarmonicsType();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-xl shadow-lg p-8">
      <div className="col-span-1 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-yellow-700 mb-3">Energy Quality Report</h2>
        <GaugeMeter value={100 - metrics.voltageHarmonics} label="Voltage Fluctuation" type="healthy" subLabel="Last 7 Days – Avg" />
        <GaugeMeter value={metrics.voltageHarmonics * 5} label="Voltage Harmonics" type={voltageHarmonicsType} subLabel="Last 7 Days – Avg" />
        <GaugeMeter value={metrics.risky * 10 + 40} label="Current Harmonics" type={currentHarmonicsType} subLabel="Last 7 Days – Avg" />
      </div>
      <div className="col-span-2 flex flex-col gap-8 items-center">
        <FacilityManagementCard />
        <ComparisonCard />
      </div>
    </div>
  );
}
