// src/lib/engines/continue_egales/calculs.ts

import { CentralTendency, Dispersion, Forme, BoxPlotData } from '@/types/statistics';
import { round, weightedMean, weightedVariance, centeredMoment, findQuantileClass, modeThales } from '@/lib/utils/math';

export function calculsEgales(
  bornesInf: number[],
  bornesSup: number[],
  effectifs: number[]
): { central: CentralTendency; dispersion: Dispersion; forme: Forme; boxPlot: BoxPlotData } {
  const total = effectifs.reduce((s, n) => s + n, 0);
  const ci = bornesInf.map((b, i) => round((b + bornesSup[i]) / 2, 4));
  const ai = bornesInf.map((b, i) => round(bornesSup[i] - b, 4));

  // Ficc
  const ficc: number[] = [];
  let cumul = 0;
  effectifs.forEach(n => { cumul += n; ficc.push(round(cumul / total, 6)); });

  // Classe modale = classe avec ni le plus élevé (amplitudes égales → ni suffit)
  const maxNi = Math.max(...effectifs);
  const modeIdx = effectifs.indexOf(maxNi);

  // Mode par Thalès
  const densityPrev = modeIdx > 0 ? effectifs[modeIdx - 1] : 0;
  const densityNext = modeIdx < effectifs.length - 1 ? effectifs[modeIdx + 1] : 0;
  const modeValue = modeThales(bornesInf[modeIdx], bornesSup[modeIdx], densityPrev, effectifs[modeIdx], densityNext);

  // Moyenne
  const moyenne = weightedMean(ci, effectifs);

  // Médiane
  const mediane = findQuantileClass(bornesInf, bornesSup, ficc, 0.5);

  // Quartiles & Déciles
  const Q1 = findQuantileClass(bornesInf, bornesSup, ficc, 0.25);
  const Q3 = findQuantileClass(bornesInf, bornesSup, ficc, 0.75);
  const IQ = round(Q3 - Q1);
  const D1 = findQuantileClass(bornesInf, bornesSup, ficc, 0.1);
  const D9 = findQuantileClass(bornesInf, bornesSup, ficc, 0.9);

  // Variance
  const variance = weightedVariance(ci, effectifs, moyenne);
  const ecartType = round(Math.sqrt(variance));
  const etendue = round(bornesSup[bornesSup.length - 1] - bornesInf[0]);
  const CV = moyenne !== 0 ? round(ecartType / moyenne, 4) : 0;

  // Forme
  const mu3 = centeredMoment(ci, effectifs, moyenne, 3);
  const mu4 = centeredMoment(ci, effectifs, moyenne, 4);
  const gamma1 = ecartType !== 0 ? round(mu3 / Math.pow(ecartType, 3), 4) : 0;
  const gamma2 = ecartType !== 0 ? round(mu4 / Math.pow(ecartType, 4) - 3, 4) : 0;

  // Box plot
  const moustacheHaut = Math.min(bornesSup[bornesSup.length - 1], Q3 + 1.5 * IQ);
  const moustacheBas = Math.max(bornesInf[0], Q1 - 1.5 * IQ);

  const classeModaleLabel = `[${bornesInf[modeIdx]};${bornesSup[modeIdx]}[`;

  const central: CentralTendency = {
    mode: modeValue,
    modeLabel: `${modeValue} (classe modale : ${classeModaleLabel})`,
    classeModale: classeModaleLabel,
    mediane,
    moyenne,
    modeDetail: `La classe modale est ${classeModaleLabel} avec l'effectif le plus élevé (ni = ${maxNi}). Par interpolation de Thalès : Δ1 = ${effectifs[modeIdx]} − ${densityPrev} = ${effectifs[modeIdx] - densityPrev}, Δ2 = ${effectifs[modeIdx]} − ${densityNext} = ${effectifs[modeIdx] - densityNext}. Mo = ${bornesInf[modeIdx]} + ${round(effectifs[modeIdx] - densityPrev)}/(${round(effectifs[modeIdx] - densityPrev)}+${round(effectifs[modeIdx] - densityNext)}) × ${ai[modeIdx]} = ${modeValue}.`,
    medianeDetail: `La médiane se trouve dans la classe où Ficc franchit 0,5. Me = a + (b−a) × (0,5 − F(a)) / (F(b) − F(a)) = ${mediane}.`,
    moyenneDetail: `X̄ = Σ(fi × ci) = ${moyenne}. Les centres de classes ci = (borne inf + borne sup) / 2 sont utilisés.`,
  };

  const dispersion: Dispersion = {
    variance, ecartType, etendue, Q1, Q3, IQ, D1, D9,
    ecartInterdecile: round(D9 - D1), CV,
    varianceDetail: `V(X) = Σfi(ci − X̄)² = ${variance}. σ = ${ecartType}.`,
    cvDetail: CV < 0.15
      ? `CV = ${round(CV * 100, 2)}% < 15% → distribution homogène.`
      : CV > 0.30
        ? `CV = ${round(CV * 100, 2)}% > 30% → distribution très hétérogène.`
        : `CV = ${round(CV * 100, 2)}% → dispersion modérée.`,
  };

  let g1i = '';
  if (gamma1 >= -1 && gamma1 <= 1) g1i = `γ1 = ${gamma1} ∈ [−1, 1] → distribution symétrique.`;
  else if (gamma1 < -1) g1i = `γ1 = ${gamma1} < −1 → étalée vers la gauche. X̄ < Me < Mo.`;
  else g1i = `γ1 = ${gamma1} > 1 → étalée vers la droite. X̄ > Me > Mo.`;

  let g2i = '';
  if (gamma2 >= -1.5 && gamma2 <= 1.5) g2i = `γ2 = ${gamma2} ∈ [−1,5 ; 1,5] → comparable à la loi normale.`;
  else if (gamma2 < -1.5) g2i = `γ2 = ${gamma2} < −1,5 → plus aplatie que la normale.`;
  else g2i = `γ2 = ${gamma2} > 1,5 → moins aplatie que la normale.`;

  const forme: Forme = { mu3, mu4, gamma1, gamma2, gamma1Detail: g1i, gamma2Detail: g2i };

  const boxPlot: BoxPlotData = {
    min: bornesInf[0], max: bornesSup[bornesSup.length - 1],
    Q1, mediane, Q3, IQ, moustacheBas, moustacheHaut, valeursAberrantes: [],
  };

  return { central, dispersion, forme, boxPlot };
}
