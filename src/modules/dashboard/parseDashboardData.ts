import * as XLSX from 'xlsx';

export interface DashboardData {
  current: number[];
  previous: number[];
  voltageHarmonics: number;
  healthy: number;
  risky: number;
  unhealthy: number;
}

export async function parseDashboardData(file: File): Promise<DashboardData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (!(result instanceof ArrayBuffer)) {
          throw new Error('Invalid file format or unreadable content.');
        }

        const buffer = new Uint8Array(result);
        const workbook = XLSX.read(buffer, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const current = rows[1]?.slice(1)?.map(Number) ?? [];
        const previous = rows[2]?.slice(1)?.map(Number) ?? [];
        const voltageHarmonics = Number(rows[5]?.[1] ?? 0);
        const healthy = Number(rows[8]?.[1] ?? 0);
        const risky = Number(rows[9]?.[1] ?? 0);
        const unhealthy = Number(rows[10]?.[1] ?? 0);

        resolve({
          current,
          previous,
          voltageHarmonics,
          healthy,
          risky,
          unhealthy,
        });
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Unknown error while parsing Excel file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the Excel file.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
