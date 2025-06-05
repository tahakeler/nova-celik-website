/**
 * Facility Comparison Card
 */
'use client';

export default function ComparisonCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64">
      <div className="mb-2 text-[15px] font-bold text-yellow-600 flex items-center">
        <span className="mr-2">Facility Comparison</span>
      </div>
      <table className="w-full text-center mt-4">
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
    </div>
  );
}
