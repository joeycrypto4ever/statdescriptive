// src/lib/engines/quantitative_discrete/concentration.ts

import { Concentration, ConcentrationRow } from '@/types/statistics';
import { round, giniIndex } from '@/lib/utils/math';

/**
 * Concentration table:
 * xi | ni | si=ni×xi | gi=si/S | Gi | fi | Fi | Gi-1+Gi | (Gi-1+Gi)×fi
 * IG = 1 - Σ fi×(Gi-1 + Gi)
 */
export function buildConcentration(
  values: number[],
  effectifs: number[]
): Concentration {
  const total = effectifs.reduce((s, n) => s + n, 0);

  // si = ni × xi, S = Σsi
  const si = values.map((v, i) => round(effectifs[i] * v, 4));
  const S = round(si.reduce((s, v) => s + v, 0), 4);

  // gi = si / S
  const gi = si.map(s => round(s / S, 6));

  // Gi = cumul gi
  const Gi: number[] = [];
  let gCumul = 0;
  gi.forEach(g => { gCumul += g; Gi.push(round(gCumul, 6)); });

  // fi, Fi
  const fi = effectifs.map(n => round(n / total, 6));
  const Fi: number[] = [];
  let fCumul = 0;
  fi.forEach(f => { fCumul += f; Fi.push(round(fCumul, 6)); });

  // Tableau
  const tableau: ConcentrationRow[] = values.map((v, i) => {
    const GiPrev = i === 0 ? 0 : Gi[i - 1];
    const GiPrevPlusGi = round(GiPrev + Gi[i], 6);
    return {
      modalite: String(v),
      ni: effectifs[i],
      ci: v,
      si: si[i],
      gi: gi[i],
      Gi: Gi[i],
      fi: fi[i],
      Fi: Fi[i],
      GiPrevPlusGi: GiPrevPlusGi,
      product: round(GiPrevPlusGi * fi[i], 6),
    };
  });

  const indiceGini = giniIndex(fi, Gi);

  // Lorenz points (Fi, Gi) with (0,0)
  const lorenzPoints = [{ Fi: 0, Gi: 0 }, ...Fi.map((f, i) => ({ Fi: f, Gi: Gi[i] }))];

  // Mediane de masse: xi where Gi crosses 0.5
  let medianeMasse: number | null = null;
  for (let i = 0; i < Gi.length; i++) {
    if (Gi[i] >= 0.5) {
      medianeMasse = values[i];
      break;
    }
  }

  let giniDetail = '';
  if (indiceGini < 0.3) giniDetail = `IG = ${indiceGini} → Faible concentration : la répartition est relativement égalitaire.`;
  else if (indiceGini < 0.6) giniDetail = `IG = ${indiceGini} → Concentration moyenne : il existe des inégalités modérées dans la répartition.`;
  else giniDetail = `IG = ${indiceGini} → Forte concentration : une petite partie des individus détient une grande partie de la masse totale.`;

  return { tableau, masseGlobale: S, indiceGini, medianeMasse, giniDetail, lorenzPoints };
}
