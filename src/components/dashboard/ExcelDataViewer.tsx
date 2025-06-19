'use client';

import { useEffect, useState } from 'react';
import { readExcelFile } from '@/utils/excelReader';

export default function ExcelDataViewer() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const excelData = await readExcelFile('public/excel/sample.xlsx');
        setData(excelData);
        
        // Log the structure to help determine appropriate visualizations
        console.log('Excel data structure:', {
          sheets: Object.keys(excelData),
          sampleData: Object.entries(excelData).map(([sheet, data]) => ({
            sheet,
            columns: data[0] ? Object.keys(data[0]) : [],
            rowCount: Array.isArray(data) ? data.length : 0
          }))
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading Excel file');
        console.error('Error loading Excel file:', err);
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading data: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        Loading data...
      </div>
    );
  }

  return (
    <div className="p-4">
      {Object.entries(data).map(([sheetName, sheetData]: [string, any]) => (
        <div key={sheetName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{sheetName}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {sheetData[0] && Object.keys(sheetData[0]).map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sheetData.map((row: any, index: number) => (
                  <tr key={index}>
                    {Object.values(row).map((value: any, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value?.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
