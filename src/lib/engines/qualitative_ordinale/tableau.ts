// src/lib/engines/qualitative_ordinale/tableau.ts

import { FrequencyRow } from '@/types/statistics';
import { round } from '@/lib/utils/math';

/**
 * Tableau ordinal:
 * Modalité | ni | fi | fi(%) | Nicc | Ficc | Ficd
 */
export function buildTableauOrdinale(
  modalites: string[],
  effectifs: number[],
  ordinalOrder: string[]
): { rows: FrequencyRow[]; total: number } {
  const ordered = ordinalOrder.filter(m => modalites.includes(m));
  const orderedEffectifs = ordered.map(m => {
    const idx = modalites.indexOf(m);
    return effectifs[idx];
  });

  const total = orderedEffectifs.reduce((s, n) => s + n, 0);
  let niccCumul = 0;

  const rows: FrequencyRow[] = ordered.map((m, i) => {
    const ni = orderedEffectifs[i];
    const fi = round(ni / total, 4);
    niccCumul += ni;

    return {
      modalite: m,
      xi: null,
      ni,
      fi,
      fiPercent: round(fi * 100, 2),
      Nicc: niccCumul,
      Ficc: round(niccCumul / total, 4),
      Ficd: round((total - niccCumul + ni) / total, 4),
    };
  });

  return { rows, total };
}
