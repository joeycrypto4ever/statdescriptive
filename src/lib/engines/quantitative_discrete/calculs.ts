// src/lib/engines/quantitative_discrete/calculs.ts

import { CentralTendency, Dispersion, Forme, BoxPlotData } from '@/types/statistics';
import { round, weightedMean, weightedVariance, centeredMoment, findQuantile } from '@/lib/utils/math';

export function calculsDiscrete(
  values: number[],
  effectifs: number[]
): { central: CentralTendency; dispersion: Dispersion; forme: Forme; boxPlot: BoxPlotData } {
  const total = effectifs.reduce((s, n) => s + n, 0);

  // Cumulated effectifs
  const nicc: number[] = [];
  let cumul = 0;
  effectifs.forEach(n => { cumul += n; nicc.push(cumul); });

  // Mode
  const maxNi = Math.max(...effectifs);
  const modeIndices = effectifs.reduce((arr, n, i) => n === maxNi ? [...arr, i] : arr, [] as number[]);
  const isBimodale = modeIndices.length > 1;
  const mode = values[modeIndices[0]];

  // Mean
  const moyenne = weightedMean(values, effectifs);

  // Mediane
  const mediane = findQuantile(values, nicc, total, 50);

  // Quartiles, Deciles
  const Q1 = findQuantile(values, nicc, total, 25);
  const Q3 = findQuantile(values, nicc, total, 75);
  const IQ = round(Q3 - Q1);
  const D1 = findQuantile(values, nicc, total, 10);
  const D9 = findQuantile(values, nicc, total, 90);

  // Variance
  const variance = weightedVariance(values, effectifs, moyenne);
  const ecartType = round(Math.sqrt(variance));
  const etendue = round(values[values.length - 1] - values[0]);
  const CV = moyenne !== 0 ? round(ecartType / moyenne, 4) : 0;

  // Forme
  const mu3 = centeredMoment(values, effectifs, moyenne, 3);
  const mu4 = centeredMoment(values, effectifs, moyenne, 4);
  const gamma1 = ecartType !== 0 ? round(mu3 / Math.pow(ecartType, 3), 4) : 0;
  const gamma2 = ecartType !== 0 ? round(mu4 / Math.pow(ecartType, 4) - 3, 4) : 0;

  // Box plot
  const moustacheHaut = Math.min(values[values.length - 1], Q3 + 1.5 * IQ);
  const moustacheBas = Math.max(values[0], Q1 - 1.5 * IQ);
  const valeursAberrantes = values.filter(v => v > moustacheHaut || v < moustacheBas);

  const central: CentralTendency = {
    mode,
    modeLabel: isBimodale
      ? `Bimodale: ${modeIndices.map(i => values[i]).join(' et ')} (ni = ${maxNi})`
      : `${mode} (ni = ${maxNi})`,
    mediane,
    moyenne,
    modeDetail: isBimodale
      ? `La série est bimodale : les valeurs ${modeIndices.map(i => values[i]).join(' et ')} ont toutes le même effectif maximal (ni = ${maxNi}).`
      : `Le mode est ${mode} car c'est la valeur avec l'effectif le plus élevé (ni = ${maxNi}).`,
    medianeDetail: `La médiane est Me = ${mediane}. Rang r = n×50/100 = ${total}×0,5 = ${total / 2}. Elle partage la série ordonnée en deux parties égales.`,
    moyenneDetail: `La moyenne est X̄ = Σ(fi × xi) = ${moyenne}.`,
  };

  const dispersion: Dispersion = {
    variance, ecartType, etendue, Q1, Q3, IQ, D1, D9,
    ecartInterdecile: round(D9 - D1),
    CV,
    varianceDetail: `V(X) = Σfi(xi − X̄)² = ${variance}. σ = √V(X) = ${ecartType}. L'étendue = xmax − xmin = ${etendue}.`,
    cvDetail: CV < 0.15
      ? `CV = σ/X̄ = ${round(CV * 100, 2)}% < 15% → distribution homogène.`
      : CV > 0.30
        ? `CV = σ/X̄ = ${round(CV * 100, 2)}% > 30% → distribution très hétérogène.`
        : `CV = σ/X̄ = ${round(CV * 100, 2)}% → dispersion modérée.`,
  };

  let g1i = '';
  if (gamma1 >= -1 && gamma1 <= 1) g1i = `γ1 = μ3/σ³ = ${gamma1} ∈ [−1, 1] → distribution symétrique, X̄ ≈ Me ≈ Mo.`;
  else if (gamma1 < -1) g1i = `γ1 = μ3/σ³ = ${gamma1} < −1 → distribution étalée vers la gauche, X̄ < Me < Mo.`;
  else g1i = `γ1 = μ3/σ³ = ${gamma1} > 1 → distribution étalée vers la droite, X̄ > Me > Mo.`;

  let g2i = '';
  if (gamma2 >= -1.5 && gamma2 <= 1.5) g2i = `γ2 = μ4/σ⁴ − 3 = ${gamma2} ∈ [−1,5 ; 1,5] → aplatissement comparable à la loi normale.`;
  else if (gamma2 < -1.5) g2i = `γ2 = ${gamma2} < −1,5 → plus aplatie que la normale, valeurs dispersées.`;
  else g2i = `γ2 = ${gamma2} > 1,5 → moins aplatie que la normale, forte concentration autour de la moyenne.`;

  const forme: Forme = { mu3, mu4, gamma1, gamma2, gamma1Detail: g1i, gamma2Detail: g2i };

  const boxPlot: BoxPlotData = {
    min: values[0], max: values[values.length - 1],
    Q1, mediane, Q3, IQ, moustacheBas, moustacheHaut, valeursAberrantes,
  };

  return { central, dispersion, forme, boxPlot };
}
