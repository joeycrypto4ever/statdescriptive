// src/lib/engines/continue_inegales/calculs.ts

import { CentralTendency, Dispersion, Forme, BoxPlotData } from '@/types/statistics';
import { round, weightedMean, weightedVariance, centeredMoment, findQuantileClass, modeThales, lcmArray } from '@/lib/utils/math';

/**
 * Classes inégales: la classe modale est celle avec di (densité) le plus élevé.
 * Histogramme: hauteur = di obligatoirement.
 * Effectifs corrigés: nic = di × ppcm(ai)
 */
export function calculsInegales(
  bornesInf: number[],
  bornesSup: number[],
  effectifs: number[]
): {
  central: CentralTendency;
  dispersion: Dispersion;
  forme: Forme;
  boxPlot: BoxPlotData;
  densites: number[];
  effectifsCorr: number[];
  ppcm: number;
} {
  const total = effectifs.reduce((s, n) => s + n, 0);
  const ai = bornesInf.map((b, i) => round(bornesSup[i] - b, 4));
  const ci = bornesInf.map((b, i) => round((b + bornesSup[i]) / 2, 4));

  // Densités di = ni / ai
  const densites = effectifs.map((n, i) => round(n / ai[i], 4));

  // PPCM des amplitudes et effectifs corrigés
  const ppcm = lcmArray(ai.map(a => Math.round(a)));
  const effectifsCorr = densites.map(d => round(d * ppcm, 2));

  // Ficc
  const ficc: number[] = [];
  let cumul = 0;
  effectifs.forEach(n => { cumul += n; ficc.push(round(cumul / total, 6)); });

  // ⚠ PIÈGE: classe modale = classe avec di le plus élevé (PAS ni le plus élevé)
  const maxDi = Math.max(...densites);
  const modeIdx = densites.indexOf(maxDi);

  // Mode par Thalès avec densités
  const dPrev = modeIdx > 0 ? densites[modeIdx - 1] : 0;
  const dNext = modeIdx < densites.length - 1 ? densites[modeIdx + 1] : 0;
  const modeValue = modeThales(bornesInf[modeIdx], bornesSup[modeIdx], dPrev, densites[modeIdx], dNext);

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

  // Build warning about the trap
  const maxNiIdx = effectifs.indexOf(Math.max(...effectifs));
  const trapWarning = maxNiIdx !== modeIdx
    ? ` ⚠ ATTENTION : la classe [${bornesInf[maxNiIdx]};${bornesSup[maxNiIdx]}[ a l'effectif le plus élevé (ni = ${effectifs[maxNiIdx]}), mais ce n'est PAS la classe modale. La classe modale est déterminée par la densité di la plus élevée, pas par ni.`
    : '';

  const central: CentralTendency = {
    mode: modeValue,
    modeLabel: `${modeValue} (classe modale : ${classeModaleLabel}, di = ${maxDi})`,
    classeModale: classeModaleLabel,
    mediane,
    moyenne,
    modeDetail: `La classe modale est ${classeModaleLabel} car elle a la densité la plus élevée (di = ${maxDi}).${trapWarning} Par Thalès : Δ1 = ${round(densites[modeIdx] - dPrev, 4)}, Δ2 = ${round(densites[modeIdx] - dNext, 4)}. Mo = ${bornesInf[modeIdx]} + ${round(densites[modeIdx] - dPrev, 4)}/(${round(densites[modeIdx] - dPrev, 4)}+${round(densites[modeIdx] - dNext, 4)}) × ${ai[modeIdx]} = ${modeValue}.`,
    medianeDetail: `Classe médiane : Ficc franchit 0,5. Me = ${mediane} par interpolation linéaire.`,
    moyenneDetail: `X̄ = Σ(fi × ci) = ${moyenne}.`,
  };

  const dispersion: Dispersion = {
    variance, ecartType, etendue, Q1, Q3, IQ, D1, D9,
    ecartInterdecile: round(D9 - D1), CV,
    varianceDetail: `V(X) = Σfi(ci − X̄)² = ${variance}. σ = ${ecartType}.`,
    cvDetail: CV < 0.15
      ? `CV = ${round(CV * 100, 2)}% < 15% → homogène.`
      : CV > 0.30
        ? `CV = ${round(CV * 100, 2)}% > 30% → très hétérogène.`
        : `CV = ${round(CV * 100, 2)}% → dispersion modérée.`,
  };

  let g1i = '';
  if (gamma1 >= -1 && gamma1 <= 1) g1i = `γ1 = ${gamma1} ∈ [−1, 1] → symétrique.`;
  else if (gamma1 < -1) g1i = `γ1 = ${gamma1} < −1 → étalée à gauche.`;
  else g1i = `γ1 = ${gamma1} > 1 → étalée à droite.`;

  let g2i = '';
  if (gamma2 >= -1.5 && gamma2 <= 1.5) g2i = `γ2 = ${gamma2} ∈ [−1,5 ; 1,5] → comparable à la normale.`;
  else if (gamma2 < -1.5) g2i = `γ2 = ${gamma2} < −1,5 → plus aplatie.`;
  else g2i = `γ2 = ${gamma2} > 1,5 → moins aplatie.`;

  const forme: Forme = { mu3, mu4, gamma1, gamma2, gamma1Detail: g1i, gamma2Detail: g2i };

  const boxPlot: BoxPlotData = {
    min: bornesInf[0], max: bornesSup[bornesSup.length - 1],
    Q1, mediane, Q3, IQ, moustacheBas, moustacheHaut, valeursAberrantes: [],
  };

  return { central, dispersion, forme, boxPlot, densites, effectifsCorr, ppcm };
}
