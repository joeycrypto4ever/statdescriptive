// src/lib/engines/continue_inegales/concentration.ts

import { Concentration, ConcentrationRow } from '@/types/statistics';
import { round, giniIndex } from '@/lib/utils/math';

export function buildConcentrationInegales(
  bornesInf: number[],
  bornesSup: number[],
  effectifs: number[]
): Concentration {
  const total = effectifs.reduce((s, n) => s + n, 0);
  const ci = bornesInf.map((b, i) => round((b + bornesSup[i]) / 2, 4));

  const si = ci.map((c, i) => round(effectifs[i] * c, 4));
  const S = round(si.reduce((s, v) => s + v, 0), 4);

  const gi = si.map(s => round(s / S, 6));
  const Gi: number[] = [];
  let gCumul = 0;
  gi.forEach(g => { gCumul += g; Gi.push(round(gCumul, 6)); });

  const fi = effectifs.map(n => round(n / total, 6));
  const Fi: number[] = [];
  let fCumul = 0;
  fi.forEach(f => { fCumul += f; Fi.push(round(fCumul, 6)); });

  const tableau: ConcentrationRow[] = bornesInf.map((b, i) => {
    const GiPrev = i === 0 ? 0 : Gi[i - 1];
    const GiPrevPlusGi = round(GiPrev + Gi[i], 6);
    return {
      modalite: `[${b};${bornesSup[i]}[`,
      ni: effectifs[i],
      ci: ci[i],
      si: si[i],
      gi: gi[i],
      Gi: Gi[i],
      fi: fi[i],
      Fi: Fi[i],
      GiPrevPlusGi,
      product: round(GiPrevPlusGi * fi[i], 6),
    };
  });

  const indiceGini = giniIndex(fi, Gi);
  const lorenzPoints = [{ Fi: 0, Gi: 0 }, ...Fi.map((f, i) => ({ Fi: f, Gi: Gi[i] }))];

  let medianeMasse: number | null = null;
  for (let i = 0; i < Gi.length; i++) {
    if (Gi[i] >= 0.5) {
      medianeMasse = ci[i];
      break;
    }
  }

  let giniDetail = '';
  if (indiceGini < 0.3) giniDetail = `IG = ${indiceGini} → Faible concentration.`;
  else if (indiceGini < 0.6) giniDetail = `IG = ${indiceGini} → Concentration moyenne.`;
  else giniDetail = `IG = ${indiceGini} → Forte concentration.`;

  return { tableau, masseGlobale: S, indiceGini, medianeMasse, giniDetail, lorenzPoints };
}
