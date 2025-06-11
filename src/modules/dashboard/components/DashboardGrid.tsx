/**
 * Dashboard Main Grid (Enerji Doktoru Style)
 */
'use client';

import GaugeMeter from './GaugeMeter';
import FacilityManagementCard from './FacilityManagementCard';
import ComparisonCard from './ComparisonCard';
import DashboardCard from './DashboardCard';

export interface GaugeItem {
  value: number;
  label: string;
  type: 'healthy' | 'risky' | 'unhealthy';
  subLabel?: string;
}
export interface DashboardGridProps {
  gauges?: GaugeItem[];
}

export default function DashboardGrid({ gauges }: DashboardGridProps = {}) {
  const defaultGauges: GaugeItem[] = [
    {
      value: 0,
      label: 'Voltage Fluctuation',
      type: 'healthy',
      subLabel: 'Last 7 Days - Average',
    },
    {
      value: 9,
      label: 'Voltage Harmonics',
      type: 'unhealthy',
      subLabel: 'Last 7 Days - Average',
    },
    {
      value: 38,
      label: 'Current Harmonics',
      type: 'unhealthy',
      subLabel: 'Last 7 Days - Average',
    },
    {
      value: 1,
      label: 'Generator Demand',
      type: 'risky',
      subLabel: 'Last 7 Days - Average',
    },
  ];
  const items = gauges ?? defaultGauges;

  return (
    <div className="grid gap-8 p-6 sm:p-8 bg-[#fffbea] grid-cols-1 lg:grid-cols-3">
      {/* Energy Quality Report */}
      <DashboardCard title="Energy Quality Report" className="flex flex-col gap-6">
        {items.map((g) => (
          <GaugeMeter
            key={g.label}
            value={g.value}
            label={g.label}
            type={g.type}
            subLabel={g.subLabel}
          />
        ))}
      </DashboardCard>

      {/* Facility Management & Comparison */}
      <div className="flex flex-col gap-6 items-center">
        <FacilityManagementCard />
        <ComparisonCard />
      </div>
    </div>
  );
}
