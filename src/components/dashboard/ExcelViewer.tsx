'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { CellValue, SheetData } from '@/utils/excelReader';

interface DataStructure {
  sheets: string[];
  sampleData: {
    sheet: string;
    columns: string[];
    rowCount: number;
    dataTypes: Record<string, string>;
  }[];
}

function getDataTypes(obj: Record<string, any>): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: typeof value,
    };
  }, {} as Record<string, string>);
}

export default function ExcelViewer() {
  const [data, setData] = useState<SheetData | null>(null);
  const [dataStructure, setDataStructure] = useState<DataStructure | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      try {
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetNames = workbook.SheetNames;
        const sheets = sheetNames.reduce<Record<string, any[]>>((acc, sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          return { ...acc, [sheetName]: jsonData };
        }, {});

        setData(sheets);

        const structure = {
          sheets: Object.keys(sheets),
          sampleData: Object.entries(sheets).map(([sheet, data]) => ({
            sheet,
            columns: data[0] ? Object.keys(data[0]) : [],
            rowCount: Array.isArray(data) ? data.length : 0,
            dataTypes: data[0] ? getDataTypes(data[0]) : {},
          })),
        };
        setDataStructure(structure);
        setError(null);
      } catch (err) {
        // Log the error for debugging
        console.error('Error reading Excel file:', err);
        setError('Error reading Excel file');
        setData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <label htmlFor="excel-upload" className="block mb-2 text-sm font-medium text-gray-700">
        Upload Excel File
      </label>
      <input
        id="excel-upload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        title="Select an Excel file to upload"
        placeholder="Choose file"
        className="mb-4"
      />
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg mt-4">
          {error}
        </div>
      )}
      {!data && !error && (
        <div className="p-4 text-gray-600">Please upload an Excel file.</div>
      )}
      {data && (
        <>
          {Object.entries(data).map(([sheetName, sheetData]) => (
            <div key={sheetName} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{sheetName}</h2>
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {sheetData[0] &&
                        Object.keys(sheetData[0]).map((header) => (
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
                    {sheetData.map((row) => {
                      // Generate a unique key for each row using a hash of its values
                      const rowKey = Object.values(row).join('-');
                      return (
                        <tr
                          key={rowKey}
                          className={Math.random() % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          {Object.entries(row).map(([cellKey, value]: [string, CellValue]) => (
                            <td
                              key={cellKey}
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
          {dataStructure && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Data Analysis</h3>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(dataStructure, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
