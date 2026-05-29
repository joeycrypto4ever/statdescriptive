// src/lib/engines/qualitative_nominale/tableau.ts

import { FrequencyRow } from '@/types/statistics';
import { round } from '@/lib/utils/math';

/**
 * Tableau nominale:
 * Modalité | ni | fi | fi(%) | αi = fi × 360°
 */
export function buildTableauNominale(
  modalites: string[],
  effectifs: number[]
): { rows: FrequencyRow[]; total: number } {
  const total = effectifs.reduce((s, n) => s + n, 0);

  const rows: FrequencyRow[] = modalites.map((m, i) => {
    const ni = effectifs[i];
    const fi = round(ni / total, 4);
    return {
      modalite: m,
      xi: null,
      ni,
      fi,
      fiPercent: round(fi * 100, 2),
      angleDeg: round(fi * 360, 2),
    };
  });

  return { rows, total };
}
