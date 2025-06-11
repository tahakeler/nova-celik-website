'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HarmonicLineChartProps {
  current: number[];
  previous: number[];
}

export default function HarmonicLineChart({ current, previous }: Readonly<HarmonicLineChartProps>) {
  const data = current.map((val, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    current: val,
    previous: previous[i] ?? 0,
  }));

  return (
    <div className="w-full bg-white shadow rounded-2xl p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Harmonics Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="previous" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
