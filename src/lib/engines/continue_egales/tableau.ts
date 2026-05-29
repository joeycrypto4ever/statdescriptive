// src/lib/engines/continue_egales/tableau.ts

import { ClassRow } from '@/types/statistics';
import { round } from '@/lib/utils/math';

/**
 * Classe | ni | ai | ci | fi | fi(%) | Ficc | Ficd | Nicc | Nicd
 * Colonne densité di facultative car amplitudes égales.
 */
export function buildTableauEgales(
  bornesInf: number[],
  bornesSup: number[],
  effectifs: number[]
): { rows: ClassRow[]; total: number } {
  const total = effectifs.reduce((s, n) => s + n, 0);

  let niccCumul = 0;
  const niccArr: number[] = [];
  effectifs.forEach(n => { niccCumul += n; niccArr.push(niccCumul); });

  const rows: ClassRow[] = bornesInf.map((b, i) => {
    const ni = effectifs[i];
    const ai = round(bornesSup[i] - b, 4);
    const ci = round((b + bornesSup[i]) / 2, 4);
    const fi = round(ni / total, 4);
    const di = round(ni / ai, 4);

    return {
      classe: `[${b};${bornesSup[i]}[`,
      borneInf: b,
      borneSup: bornesSup[i],
      ni,
      ai,
      ci,
      fi,
      fiPercent: round(fi * 100, 2),
      di,
      Nicc: niccArr[i],
      Nicd: total - niccArr[i] + ni,
      Ficc: round(niccArr[i] / total, 4),
      Ficd: round((total - niccArr[i] + ni) / total, 4),
    };
  });

  return { rows, total };
}
