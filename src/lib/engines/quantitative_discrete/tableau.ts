// src/lib/engines/quantitative_discrete/tableau.ts

import { FrequencyRow } from '@/types/statistics';
import { round } from '@/lib/utils/math';

/**
 * xi | ni | fi | fi(%) | Nicc | Nicd | Ficc | Ficd
 */
export function buildTableauDiscrete(
  values: number[],
  effectifs: number[]
): { rows: FrequencyRow[]; total: number } {
  const total = effectifs.reduce((s, n) => s + n, 0);
  let niccCumul = 0;
  const niccArr: number[] = [];
  effectifs.forEach(n => { niccCumul += n; niccArr.push(niccCumul); });

  const rows: FrequencyRow[] = values.map((v, i) => {
    const ni = effectifs[i];
    const fi = round(ni / total, 4);
    return {
      modalite: String(v),
      xi: v,
      ni,
      fi,
      fiPercent: round(fi * 100, 2),
      Nicc: niccArr[i],
      Nicd: total - niccArr[i] + ni,
      Ficc: round(niccArr[i] / total, 4),
      Ficd: round((total - niccArr[i] + ni) / total, 4),
    };
  });

  return { rows, total };
}
