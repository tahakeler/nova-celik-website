'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { DEFAULT_LABELS } from '../dashboard.constants';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ConsumptionChartProps {
  readonly current: number[];
  readonly previous: number[];
}

export default function ConsumptionChart({ current, previous }: ConsumptionChartProps) {
  const data = {
    labels: [...DEFAULT_LABELS],
    datasets: [
      {
        label: 'Current',
        data: current,
        backgroundColor: '#ffe500',
      },
      {
        label: 'Previous',
        data: previous,
        backgroundColor: '#cccccc',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 1200 },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#334155' }
      },
      x: {
        ticks: { color: '#334155' }
      }
    }
  } as const;

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl mx-auto">
      <div className="mb-2 text-[15px] font-bold text-yellow-600 flex items-center">
        <span className="mr-2">Consumption (All Facilities)</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}
