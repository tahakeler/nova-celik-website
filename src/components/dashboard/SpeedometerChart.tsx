// src/components/dashboard/SpeedometerChart.tsx
'use client';

import { useMemo } from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface SpeedometerChartProps {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
}

export default function SpeedometerChart({
  value,
  max = 100,
  label = 'Generator Demand',
  unit = '%',
}: Readonly<SpeedometerChartProps>) {
  const clampedValue = Math.min(value, max);

  const getFillColor = (value: number) => {
    if (value < 33) return '#10B981';
    if (value < 66) return '#FBBF24';
    return '#EF4444';
  };

  const data = useMemo(
    () => [
      {
        name: 'Demand',
        value: clampedValue,
        fill: getFillColor(clampedValue),
      },
    ],
    [clampedValue]
  );

  return (
    <div className="w-full max-w-xs bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
      <div className="relative w-40 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, max]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              startAngle={180}
              endAngle={0}
              background
              dataKey="value"
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <span className="text-xl font-bold text-gray-800">
            {Math.round(clampedValue)}{unit}
          </span>
        </div>
      </div>
    </div>
  );
}
