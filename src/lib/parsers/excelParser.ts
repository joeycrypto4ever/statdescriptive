// src/lib/parsers/excelParser.ts

import { ParsedData } from '@/types/analysis';

/** Read an Excel or TXT file and convert to ParsedData */
export async function parseFile(file: File): Promise<ParsedData> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv' || extension === 'txt') {
    const text = await file.text();
    // Reuse CSV parser
    const { parseCSV } = await import('./csvParser');
    return parseCSV(text);
  }

  if (extension === 'xlsx' || extension === 'xls') {
    const XLSX = await import('xlsx');
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const csvText = XLSX.utils.sheet_to_csv(sheet, { FS: ',' });
    const { parseCSV } = await import('./csvParser');
    return parseCSV(csvText);
  }

  throw new Error(`Format non supporté: .${extension}. Utilisez CSV, TXT ou Excel.`);
}
