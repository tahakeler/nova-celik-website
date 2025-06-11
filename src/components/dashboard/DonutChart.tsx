// src/components/dashboard/DonutChart.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
}

const COLORS = ['#1D4ED8', '#E5E7EB'];

export default function DonutChart({
  value,
  max = 100,
  label = 'Voltage Harmonics',
  unit = '%',
}: Readonly<DonutChartProps>) {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [
    { name: 'Used', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div className="w-full max-w-xs bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="75%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-blue-700">
            {Math.round(percentage)}{unit}
          </span>
        </div>
      </div>
    </div>
  );
}
