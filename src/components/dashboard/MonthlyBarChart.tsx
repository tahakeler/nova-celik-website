'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyBarChartProps {
  current: number[];
  previous: number[];
}

export default function MonthlyBarChart({ current, previous }: Readonly<MonthlyBarChartProps>) {
  const data = current.map((val, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    current: val,
    previous: previous[i] ?? 0,
  }));

  return (
    <div className="w-full bg-white shadow rounded-2xl p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Monthly Consumption</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="previous" fill="#94A3B8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
