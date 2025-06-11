/**
 * Facility Comparison Card
 */
'use client';

import DashboardCard from './DashboardCard';

export default function ComparisonCard() {
  return (
    <DashboardCard title="Facility Comparison" className="w-64">
      <table className="w-full text-center mt-4" aria-label="Facility comparison table">
        <thead>
          <tr>
            <th className="p-1 font-semibold">Facility</th>
            <th className="p-1 font-semibold">Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 bg-gray-50 rounded-l-lg">A</td>
            <td className="p-1 bg-red-100 text-red-600 font-bold">▲</td>
          </tr>
          <tr>
            <td className="p-1 bg-gray-50">B</td>
            <td className="p-1 bg-yellow-100 text-yellow-600 font-bold">▲</td>
          </tr>
          <tr>
            <td className="p-1 bg-gray-50 rounded-r-lg">C</td>
            <td className="p-1 bg-lime-100 text-lime-600 font-bold">▼</td>
          </tr>
        </tbody>
      </table>
    </DashboardCard>
  );
}
