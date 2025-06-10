'use client';

import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

export default function ComparisonCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <h3 className="text-lg font-bold mb-3 text-gray-900">Facility Comparison</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left px-3 py-1 font-semibold">Facility</th>
            <th className="text-left px-3 py-1 font-semibold">Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-red-50">
            <td className="px-3 py-2">A</td>
            <td className="px-3 py-2 text-red-700 flex items-center gap-1">
              <ArrowUp className="inline w-4 h-4" /> Up
            </td>
          </tr>
          <tr className="bg-yellow-50">
            <td className="px-3 py-2">B</td>
            <td className="px-3 py-2 text-yellow-700 flex items-center gap-1">
              <ArrowRight className="inline w-4 h-4" /> Stable
            </td>
          </tr>
          <tr className="bg-green-50">
            <td className="px-3 py-2">C</td>
            <td className="px-3 py-2 text-lime-700 flex items-center gap-1">
              <ArrowDown className="inline w-4 h-4" /> Down
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
