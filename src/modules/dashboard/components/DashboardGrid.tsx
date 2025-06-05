/**
 * Dashboard Main Grid (Enerji Doktoru Style)
 */
'use client';

import GaugeMeter from './GaugeMeter';
import FacilityManagementCard from './FacilityManagementCard';
import ComparisonCard from './ComparisonCard';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#fffbea] min-h-screen">
      {/* Energy Quality Report */}
      <div className="col-span-1 flex flex-col gap-6">
        <div>
          <div className="text-lg font-bold text-yellow-600 mb-3">
            Energy Quality Report
          </div>
          {items.map((g) => (
            <GaugeMeter
              key={g.label}
              value={g.value}
              label={g.label}
              type={g.type}
              subLabel={g.subLabel}
            />
          ))}
        </div>
      </div>

      {/* Facility Management & Comparison */}
      <div className="col-span-1 flex flex-col gap-6 items-center">
        <FacilityManagementCard />
        <ComparisonCard />
      </div>
    </div>
  );
}
