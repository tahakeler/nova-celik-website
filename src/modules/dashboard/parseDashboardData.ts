import * as XLSX from 'xlsx';

export interface DashboardData {
  voltageFluctuation: number;
  voltageHarmonics: number;
  currentHarmonics: number;
  generatorDemand: number;
  healthy: number;
  risky: number;
  unhealthy: number;
  current: number[];  // for current year monthly data
  previous: number[]; // for previous year monthly data
}

export async function parseDashboardData(file: File): Promise<DashboardData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 });

        // You must adapt this parser to your .xlsx structure!
        // For demo: expecting metric values at fixed cells/rows/cols.
        resolve({
          voltageFluctuation: Number(json[1]?.[1]) || 0,
          voltageHarmonics: Number(json[2]?.[1]) || 0,
          currentHarmonics: Number(json[3]?.[1]) || 0,
          generatorDemand: Number(json[4]?.[1]) || 0,
          healthy: Number(json[5]?.[1]) || 0,
          risky: Number(json[6]?.[1]) || 0,
          unhealthy: Number(json[7]?.[1]) || 0,
          current: Array.isArray(json[8]) ? json[8].slice(1).map(Number) : [],
          previous: Array.isArray(json[9]) ? json[9].slice(1).map(Number) : [],
        });
      } catch (err) {
        reject(new Error(err instanceof Error ? err.message : String(err)));
      }
    };
    reader.onerror = (e) => reject(new Error('File read error'));
    reader.readAsArrayBuffer(file);
  });
}
