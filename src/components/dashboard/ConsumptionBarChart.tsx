'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ConsumptionBarChartProps {
  current: number[];
  previous: number[];
}

export default function ConsumptionBarChart({ current, previous }: Readonly<ConsumptionBarChartProps>) {
  const data = current.map((val, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    current: val,
    previous: previous[i] ?? 0,
  }));

  return (
    <div className="w-full bg-white shadow rounded-2xl p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Energy Consumption</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="previous" stackId="a" fill="#E0E7FF" />
            <Bar dataKey="current" stackId="a" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
