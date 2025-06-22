'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelDataTable() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataStructure, setDataStructure] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target?.result;
      try {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetNames = workbook.SheetNames;
        const sheets: Record<string, any[]> = {};
        for (const sheetName of sheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          sheets[sheetName] = jsonData;
        }

        setData(sheets);

        // Extract structure for analysis
        const sampleData = Object.entries(sheets).map(([sheet, data]) => {
          let columns: string[] = [];
          let rowCount = 0;
          let dataTypes: Record<string, string> = {};
          if (Array.isArray(data) && data[0]) {
            columns = Object.keys(data[0]);
            rowCount = data.length;
            dataTypes = {};
            for (const [key, value] of Object.entries(data[0])) {
              dataTypes[key] = typeof value;
            }
          }
          return { sheet, columns, rowCount, dataTypes };
        });
        const structure = {
          sheets: Object.keys(sheets),
          sampleData,
        };
        setDataStructure(structure);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error reading Excel file: ${err.message}`);
        } else {
          setError('Error reading Excel file');
        }
        setData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <label htmlFor="excel-upload" className="block mb-2 font-medium text-gray-700">
          Upload Excel file
        </label>
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      {Object.entries(data).map(([sheetName, sheetData]) => {
        const rows = sheetData as any[];
        const headerKeys = rows[0] ? Object.keys(rows[0]) : [];
        return (
          <div key={sheetName} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{sheetName}</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headerKeys.map((header) => (
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
                  {rows.map((row: any, rowIndex: number) => {
                    // Create a unique key for each row using a hash of its values
                    const rowKey = headerKeys.map((k) => String(row[k])).join('|') || rowIndex;
                    return (
                      <tr key={rowKey} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {headerKeys.map((key) => (
                          <td
                            key={key + '-' + rowKey}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {row[key]?.toString() ?? ''}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {dataStructure && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Data Analysis</h3>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(dataStructure, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
