import * as XLSX from 'xlsx';

// Define types for Excel data
export type CellValue = string | number | null | undefined;
export type RowData = Record<string, CellValue>;
export type SheetData = Record<string, RowData[]>;

export const readExcelFile = async (filePath: string): Promise<SheetData> => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    
    // Convert all sheets to JSON
    const sheets = sheetNames.reduce((acc, sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      return { ...acc, [sheetName]: jsonData };
    }, {});

    return sheets;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
};
