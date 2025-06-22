'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelDataViewer() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target?.result;
      try {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetNames = workbook.SheetNames;
        const sheets = sheetNames.reduce<Record<string, any[]>>((acc, sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          return { ...acc, [sheetName]: jsonData };
        }, {});

        setData(sheets);
        setError(null);
      } catch (err) {
        console.error('Error reading Excel file:', err);
        setError('Error reading Excel file');
        setData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

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
        <label htmlFor="excel-upload" className="block mb-2 text-sm font-medium text-gray-700">
          Upload Excel file
        </label>
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          title="Select an Excel file to upload"
        />
        <div className="mt-4 text-gray-600">Please upload an Excel file.</div>
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
                {sheetData.map((row: any, rowIndex: number) => {
                  // Try to use a unique key from the row, fallback to a composite key
                  const rowKey =
                    row.id ??
                    row.ID ??
                    Object.values(row).join('-') + '-' + rowIndex;
                  return (
                    <tr key={rowKey}>
                      {Object.values(row).map((value: any, cellIndex: number) => (
                        <td
                          key={Object.keys(row)[cellIndex] ?? cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {value?.toString() ?? ''}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
