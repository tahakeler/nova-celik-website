'use client';

interface MiniBarKPIsProps {
  healthy: number;
  risky: number;
  unhealthy: number;
}

export default function MiniBarKPIs({ healthy, risky, unhealthy }: Readonly<MiniBarKPIsProps>) {
  const max = Math.max(healthy, risky, unhealthy, 1);

  const renderBar = (label: string, value: number, color: string) => (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-md w-4 transition-all"
        style={{
          height: `${(value / max) * 60}px`,
          backgroundColor: color,
        }}
      />
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Step Status</h3>
      <div className="flex gap-4 items-end h-24">
        {renderBar('Healthy', healthy, '#10B981')}
        {renderBar('Risky', risky, '#FBBF24')}
        {renderBar('Unhealthy', unhealthy, '#EF4444')}
      </div>
    </div>
  );
}
