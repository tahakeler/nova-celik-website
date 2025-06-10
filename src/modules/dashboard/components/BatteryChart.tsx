'use client';

interface BatteryChartProps {
  readonly healthy: number;
  readonly risky: number;
  readonly unhealthy: number;
}

export default function BatteryChart({ healthy, risky, unhealthy }: BatteryChartProps) {
  const round = (n: number | undefined) => (n == null ? '–' : Math.round(n * 10) / 10);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <div className="bg-lime-100 rounded-md p-4 flex flex-col items-center">
          <span className="text-lg font-bold text-lime-700">{round(healthy)}</span>
          <span className="text-xs text-gray-600">Healthy</span>
        </div>
        <div className="bg-yellow-100 rounded-md p-4 flex flex-col items-center">
          <span className="text-lg font-bold text-yellow-700">{round(risky)}</span>
          <span className="text-xs text-gray-600">Risky</span>
        </div>
        <div className="bg-red-100 rounded-md p-4 flex flex-col items-center">
          <span className="text-lg font-bold text-red-700">{round(unhealthy)}</span>
          <span className="text-xs text-gray-600">Unhealthy</span>
        </div>
      </div>
    </div>
  );
}
