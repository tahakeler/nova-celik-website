'use client';

import InfoTooltip from '@/components/ui/InfoTooltip';

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
        className="rounded-md w-5 transition-all"
        style={{
          height: `${(value / max) * 60}px`,
          backgroundColor: color,
        }}
      />
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="w-auto max-w-[280px] bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
      <div className="flex items-center mb-3 space-x-2">
        <h3 className="text-sm font-medium text-gray-500">Step Status</h3>
        <InfoTooltip
          label="Information about Step Status chart"
          description={
            <>
              This chart represents the distribution of system health statuses across monitored components. <br />
              <strong>Healthy</strong> indicates components operating within optimal parameters, <strong>Risky</strong> indicates components with potential issues, and <strong>Unhealthy</strong> indicates components requiring immediate attention.
            </>
          }
        />
      </div>
      <div className="flex gap-2 items-end h-24">
        {renderBar('Healthy', healthy, '#10B981')}
        {renderBar('Risky', risky, '#FBBF24')}
        {renderBar('Unhealthy', unhealthy, '#EF4444')}
      </div>
    </div>
  );
}
