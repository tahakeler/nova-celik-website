// scripts/convertExcelToJson.js
const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('./sample.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const json = XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync('./src/data/dashboardData.json', JSON.stringify(json, null, 2));
console.log('Excel converted to JSON!');
