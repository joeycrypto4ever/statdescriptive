// src/lib/engines/codage/codageMap.ts

import { ORDINAL_SCALES } from '@/lib/utils/constants';

/**
 * Auto-generate a coding map from ordinal order.
 * e.g. ['Nul', 'Médiocre', 'Moyen', 'Bien', 'Excellent'] → {Nul:1, Médiocre:2, ...}
 */
export function generateCodageMap(ordinalOrder: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  ordinalOrder.forEach((m, i) => {
    map[m] = i + 1;
  });
  return map;
}

/** Try to auto-detect an ordinal scale and return the full ordered list */
export function detectOrdinalScale(values: string[]): string[] | null {
  const lowerValues = values.map(v => v.toLowerCase().trim());
  const uniqueLower = [...new Set(lowerValues)];

  for (const [, scale] of Object.entries(ORDINAL_SCALES)) {
    const scaleLower = scale.map(s => s.toLowerCase());
    const matchCount = uniqueLower.filter(v => scaleLower.includes(v)).length;
    if (matchCount >= 2 && matchCount / uniqueLower.length >= 0.5) {
      // Return only matching values in scale order
      return scale.filter(s =>
        uniqueLower.includes(s.toLowerCase())
      );
    }
  }
  return null;
}
