'use client';

interface TestChartProps {
  value: number;
  label: string;
  unit: string;
}

export default function TestChart({ value, label, unit }: TestChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
      <div className="text-3xl font-bold text-blue-600">
        {value}{unit}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Test Chart Component
      </div>
    </div>
  );
}
