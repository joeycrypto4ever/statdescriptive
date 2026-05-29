// src/lib/engines/codage/calculs.ts

import { CentralTendency, Dispersion, Forme } from '@/types/statistics';
import { round, weightedMean, weightedVariance, centeredMoment, findQuantile } from '@/lib/utils/math';
import { generateCodageMap } from './codageMap';

/**
 * After coding ordinal → numeric, apply all discrete quantitative indicators.
 */
export function calculsCodage(
  modalites: string[],
  effectifs: number[],
  ordinalOrder: string[]
): { central: CentralTendency; dispersion: Dispersion; forme: Forme; codageMap: Record<string, number> } {
  const codageMap = generateCodageMap(ordinalOrder);

  // Reorder
  const ordered = ordinalOrder.filter(m => modalites.includes(m));
  const orderedEffectifs = ordered.map(m => effectifs[modalites.indexOf(m)]);
  const values = ordered.map(m => codageMap[m]);

  const total = orderedEffectifs.reduce((s, n) => s + n, 0);

  // Mean
  const moyenne = weightedMean(values, orderedEffectifs);

  // Mode
  const maxNi = Math.max(...orderedEffectifs);
  const modeIdx = orderedEffectifs.indexOf(maxNi);
  const mode = ordered[modeIdx];

  // Cumulated effectifs
  const nicc: number[] = [];
  let cumul = 0;
  orderedEffectifs.forEach(n => { cumul += n; nicc.push(cumul); });

  // Mediane
  const mediane = findQuantile(values, nicc, total, 50);
  const Q1 = findQuantile(values, nicc, total, 25);
  const Q3 = findQuantile(values, nicc, total, 75);
  const D1 = findQuantile(values, nicc, total, 10);
  const D9 = findQuantile(values, nicc, total, 90);
  const IQ = round(Q3 - Q1);

  // Variance & ecart-type
  const variance = weightedVariance(values, orderedEffectifs, moyenne);
  const ecartType = round(Math.sqrt(variance));
  const CV = round(ecartType / moyenne, 4);
  const etendue = round(values[values.length - 1] - values[0]);

  // Forme
  const mu3 = centeredMoment(values, orderedEffectifs, moyenne, 3);
  const mu4 = centeredMoment(values, orderedEffectifs, moyenne, 4);
  const gamma1 = round(mu3 / Math.pow(ecartType, 3), 4);
  const gamma2 = round(mu4 / Math.pow(ecartType, 4) - 3, 4);

  const central: CentralTendency = {
    mode: codageMap[mode],
    modeLabel: `${mode} (code = ${codageMap[mode]})`,
    mediane,
    moyenne,
    modeDetail: `Le mode est « ${mode} » (codé ${codageMap[mode]}) avec l'effectif le plus élevé (ni = ${maxNi}).`,
    medianeDetail: `La médiane est ${mediane}. Elle partage la série en deux parties égales.`,
    moyenneDetail: `La moyenne est X̄ = ${moyenne}. Elle est calculée avec les valeurs codées : X̄ = Σ(fi × xi).`,
  };

  const dispersion: Dispersion = {
    variance,
    ecartType,
    etendue,
    Q1, Q3, IQ, D1, D9,
    ecartInterdecile: round(D9 - D1),
    CV,
    varianceDetail: `V(X) = Σfi(xi − X̄)² = ${variance}. L'écart-type σ = √V(X) = ${ecartType}.`,
    cvDetail: CV < 0.15
      ? `CV = ${round(CV * 100, 2)}% < 15% → la distribution est homogène.`
      : CV > 0.30
        ? `CV = ${round(CV * 100, 2)}% > 30% → la distribution est très hétérogène.`
        : `CV = ${round(CV * 100, 2)}% → la distribution présente une dispersion modérée.`,
  };

  let g1Interp = '';
  if (gamma1 >= -1 && gamma1 <= 1) g1Interp = `γ1 = ${gamma1} ∈ [−1, 1] → la distribution est approximativement symétrique. X̄ ≈ Me ≈ Mo.`;
  else if (gamma1 < -1) g1Interp = `γ1 = ${gamma1} < −1 → la distribution est étalée vers la gauche (asymétrie négative). X̄ < Me < Mo.`;
  else g1Interp = `γ1 = ${gamma1} > 1 → la distribution est étalée vers la droite (asymétrie positive). X̄ > Me > Mo.`;

  let g2Interp = '';
  if (gamma2 >= -1.5 && gamma2 <= 1.5) g2Interp = `γ2 = ${gamma2} ∈ [−1,5 ; 1,5] → l'aplatissement est comparable à la loi normale.`;
  else if (gamma2 < -1.5) g2Interp = `γ2 = ${gamma2} < −1,5 → la distribution est plus aplatie que la normale, les valeurs sont dispersées.`;
  else g2Interp = `γ2 = ${gamma2} > 1,5 → la distribution est moins aplatie que la normale, forte concentration autour de la moyenne.`;

  const forme: Forme = {
    mu3, mu4, gamma1, gamma2,
    gamma1Detail: g1Interp,
    gamma2Detail: g2Interp,
  };

  return { central, dispersion, forme, codageMap };
}
