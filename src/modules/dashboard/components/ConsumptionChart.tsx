/**
 * Animated Bar Chart for Consumption (Enerji Doktoru Style)
 */
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ConsumptionChart() {
  const data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: '2016',
        data: [90, 80, 70, 100, 120, 150, 130, 140, 120, 90, 80, 70],
        backgroundColor: '#ffe500',
      },
      {
        label: '2015',
        data: [80, 90, 100, 110, 115, 120, 110, 120, 110, 100, 90, 80],
        backgroundColor: '#cccccc',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 1200 },
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
