// src/lib/parsers/csvParser.ts

import { ParsedData } from '@/types/analysis';

export function parseCSV(text: string): ParsedData {
  const lines = text.trim().split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length < 2) throw new Error('Le CSV doit contenir au moins un en-tête et une ligne de données.');

  // Detect separator
  const firstLine = lines[0];
  let separator = ',';
  if (firstLine.includes(';') && !firstLine.includes(',')) separator = ';';
  else if (firstLine.includes('\t') && !firstLine.includes(',')) separator = '\t';

  const headers = lines[0].split(separator).map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(separator).map(v => v.trim().replace(/^["']|["']$/g, ''));
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = values[j] || '';
    });
    rows.push(row);
  }

  return { headers, rows, raw: text };
}

/** Parse "Modalite,Effectif" format into expanded rows */
export function isEffectifFormat(headers: string[]): boolean {
  if (headers.length !== 2) return false;
  const second = headers[1].toLowerCase();
  return ['effectif', 'effectifs', 'ni', 'n', 'freq', 'frequence', 'nombre'].includes(second);
}

/** Expand effectif format: each row repeated ni times */
export function expandEffectifFormat(data: ParsedData): ParsedData {
  const variableHeader = data.headers[0];
  const effectifHeader = data.headers[1];
  const expandedRows: Record<string, string>[] = [];

  for (const row of data.rows) {
    const ni = parseInt(row[effectifHeader], 10);
    if (isNaN(ni)) continue;
    for (let i = 0; i < ni; i++) {
      expandedRows.push({ [variableHeader]: row[variableHeader] });
    }
  }

  return {
    headers: [variableHeader],
    rows: expandedRows,
    raw: data.raw,
  };
}

/** Extract unique modalities with their effectifs from raw or effectif format */
export function extractModalitiesWithEffectifs(
  data: ParsedData,
  variable: string
): { modalite: string; ni: number }[] {
  // Check if effectif format
  if (data.headers.length === 2 && isEffectifFormat(data.headers) && data.headers[0] === variable) {
    return data.rows.map(row => ({
      modalite: row[variable],
      ni: parseInt(row[data.headers[1]], 10) || 0,
    }));
  }

  // Raw format: count occurrences
  const counts = new Map<string, number>();
  for (const row of data.rows) {
    const val = row[variable];
    if (val === undefined || val === '') continue;
    counts.set(val, (counts.get(val) || 0) + 1);
  }
  return Array.from(counts.entries()).map(([modalite, ni]) => ({ modalite, ni }));
}
