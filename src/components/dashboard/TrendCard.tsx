'use client';

interface TrendCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down';
  change: number;
  unit?: string;
}

export default function TrendCard({ title, value, trend, change, unit = '' }: Readonly<TrendCardProps>) {
  const isUp = trend === 'up';
  const arrow = isUp ? '▲' : '▼';
  const color = isUp ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-2xl p-4 shadow relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <p className="text-lg font-semibold text-gray-700">
          {value.toFixed(2)}{unit}
        </p>
        <p className={`text-sm font-medium ${color}`}>
          {arrow} {change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
