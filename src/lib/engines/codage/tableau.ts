// src/lib/engines/codage/tableau.ts

import { FrequencyRow } from '@/types/statistics';
import { round } from '@/lib/utils/math';
import { generateCodageMap } from './codageMap';

/**
 * Tableau codage: same as discrete with coded values
 * Modalité | Code xi | ni | fi | fi(%) | Nicc | Nicd | Ficc | Ficd
 */
export function buildTableauCodage(
  modalites: string[],
  effectifs: number[],
  ordinalOrder: string[]
): { rows: FrequencyRow[]; total: number; codageMap: Record<string, number> } {
  const codageMap = generateCodageMap(ordinalOrder);
  const ordered = ordinalOrder.filter(m => modalites.includes(m));
  const orderedEffectifs = ordered.map(m => effectifs[modalites.indexOf(m)]);
  const total = orderedEffectifs.reduce((s, n) => s + n, 0);

  let niccCumul = 0;
  const niccArr: number[] = [];
  orderedEffectifs.forEach(n => { niccCumul += n; niccArr.push(niccCumul); });

  const rows: FrequencyRow[] = ordered.map((m, i) => {
    const ni = orderedEffectifs[i];
    const fi = round(ni / total, 4);
    return {
      modalite: `${m} (${codageMap[m]})`,
      xi: codageMap[m],
      ni,
      fi,
      fiPercent: round(fi * 100, 2),
      Nicc: niccArr[i],
      Nicd: total - niccArr[i] + ni,
      Ficc: round(niccArr[i] / total, 4),
      Ficd: round((total - niccArr[i] + ni) / total, 4),
    };
  });

  return { rows, total, codageMap };
}
