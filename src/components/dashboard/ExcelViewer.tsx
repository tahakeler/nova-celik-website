'use client';

import { useEffect, useState } from 'react';
import { readExcelFile, SheetData } from '@/utils/excelReader';

interface DataStructure {
  sheets: string[];
  sampleData: {
    sheet: string;
    columns: string[];
    rowCount: number;
    dataTypes: Record<string, string>;
  }[];
}

export default function ExcelViewer() {
  const [data, setData] = useState<SheetData | null>(null);
  const [dataStructure, setDataStructure] = useState<DataStructure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataStructure, setDataStructure] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const excelData = await readExcelFile('public/excel/sample.xlsx');
        setData(excelData);
        
        // Analyze data structure to determine appropriate visualizations
        const structure = {
          sheets: Object.keys(excelData),
          sampleData: Object.entries(excelData).map(([sheet, data]) => ({
            sheet,
            columns: data[0] ? Object.keys(data[0]) : [],
            rowCount: Array.isArray(data) ? data.length : 0,
            dataTypes: data[0] ? Object.entries(data[0]).reduce((acc, [key, value]) => ({
              ...acc,
              [key]: typeof value
            }), {}) : {}
          }))
        };
        
        setDataStructure(structure);
        console.log('Data structure:', structure);
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
      <div className="p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {Object.entries(data).map(([sheetName, sheetData]) => (
        <div key={sheetName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{sheetName}</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
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
                {sheetData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.values(row).map((value: CellValue, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value?.toString() ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
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
    </div>
  );
}
