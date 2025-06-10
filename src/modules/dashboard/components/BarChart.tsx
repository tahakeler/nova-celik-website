'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
  readonly currentYear: readonly number[];
  readonly previousYear: readonly number[];
  readonly labels: readonly string[];
}

export default function BarChart({ currentYear, previousYear, labels }: BarChartProps) {
  const data = {
    labels: [...labels],
    datasets: [
      {
        label: 'Current Year',
        data: currentYear.map(v => Math.round(v * 10) / 10),
        backgroundColor: '#2563eb',
      },
      {
        label: 'Previous Year',
        data: previousYear.map(v => Math.round(v * 10) / 10),
        backgroundColor: '#94a3b8',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 13 },
          color: '#222',
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Month',
          color: '#2d3748',
          font: { weight: 'bold', size: 13 },
        },
        ticks: { color: '#334155' },
      },
      y: {
        grid: { color: '#f3f4f6' },
        title: {
          display: true,
          text: 'Consumption (kWh)',
          color: '#2d3748',
          font: { weight: 'bold', size: 13 },
        },
        ticks: { color: '#334155', stepSize: 50 },
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
}
