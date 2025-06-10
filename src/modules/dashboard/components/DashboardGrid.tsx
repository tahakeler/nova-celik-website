import GaugeMeter from './GaugeMeter';
import FacilityManagementCard from './FacilityManagementCard';
import ComparisonCard from './ComparisonCard';
import type { DashboardData } from '../dashboard.types';

interface DashboardGridProps {
  data: DashboardData;
}

export default function DashboardGrid({ data }: Readonly<DashboardGridProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Left: Quality Metrics */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Energy Quality Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <GaugeMeter
              value={Math.round((data.voltageFluctuation ?? 0) * 10) / 10}
              label="Voltage Fluctuation"
              type="risky"
              subLabel="Last 7 Days Avg"
            />
            <GaugeMeter
              value={Math.round((data.voltageHarmonics ?? 0) * 10) / 10}
              label="Voltage Harmonics"
              type="unhealthy"
              subLabel="Last 7 Days Avg"
            />
            <GaugeMeter
              value={Math.round((data.currentHarmonics ?? 0) * 10) / 10}
              label="Current Harmonics"
              type="unhealthy"
              subLabel="Last 7 Days Avg"
            />
            <GaugeMeter
              value={Math.round((data.generatorDemand ?? 0) * 10) / 10}
              label="Generator Demand"
              type="risky"
              subLabel="Last 7 Days Avg"
            />
          </div>
        </div>
      </div>
      {/* Right: Facility & Comparison */}
      <div className="flex flex-col gap-6 w-full md:w-[400px]">
        <FacilityManagementCard />
        <ComparisonCard />
      </div>
    </div>
  );
}
