// src/lib/engines/continue_inegales/tableau.ts

import { ClassRow } from '@/types/statistics';
import { round, lcmArray } from '@/lib/utils/math';

/**
 * Classe | ni | ai | ci | fi | di=ni/ai | nic=di×ppcm(ai) | Ficc | Ficd | Nicc | Nicd
 * Toutes colonnes OBLIGATOIRES pour classes inégales.
 */
export function buildTableauInegales(
  bornesInf: number[],
  bornesSup: number[],
  effectifs: number[]
): { rows: ClassRow[]; total: number; ppcm: number } {
  const total = effectifs.reduce((s, n) => s + n, 0);
  const ai = bornesInf.map((b, i) => round(bornesSup[i] - b, 4));
  const ppcm = lcmArray(ai.map(a => Math.round(a)));

  let niccCumul = 0;
  const niccArr: number[] = [];
  effectifs.forEach(n => { niccCumul += n; niccArr.push(niccCumul); });

  const rows: ClassRow[] = bornesInf.map((b, i) => {
    const ni = effectifs[i];
    const amplitude = ai[i];
    const ci = round((b + bornesSup[i]) / 2, 4);
    const fi = round(ni / total, 4);
    const di = round(ni / amplitude, 4);
    const nic = round(di * ppcm, 2);

    return {
      classe: `[${b};${bornesSup[i]}[`,
      borneInf: b,
      borneSup: bornesSup[i],
      ni,
      ai: amplitude,
      ci,
      fi,
      fiPercent: round(fi * 100, 2),
      di,
      nic,
      Nicc: niccArr[i],
      Nicd: total - niccArr[i] + ni,
      Ficc: round(niccArr[i] / total, 4),
      Ficd: round((total - niccArr[i] + ni) / total, 4),
    };
  });

  return { rows, total, ppcm };
}
