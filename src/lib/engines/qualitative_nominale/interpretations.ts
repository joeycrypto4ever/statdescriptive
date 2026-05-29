// src/lib/engines/qualitative_nominale/interpretations.ts

import { FrequencyRow, CentralTendency } from '@/types/statistics';

export function interpretNominale(
  rows: FrequencyRow[],
  central: CentralTendency,
  total: number
): Record<string, string> {
  const modeRow = rows.find(r => r.modalite === central.mode);
  const modePercent = modeRow ? modeRow.fiPercent : 0;

  const sorted = [...rows].sort((a, b) => b.ni - a.ni);
  const top3 = sorted.slice(0, 3).map(r => `« ${r.modalite} » (${r.fiPercent}%)`).join(', ');

  return {
    mode: `Le mode de cette distribution est « ${central.mode} » avec un effectif de ${modeRow?.ni} (${modePercent}% du total). C'est la modalité la plus fréquente dans l'échantillon.`,
    tableau: `La distribution compte ${total} observations réparties en ${rows.length} modalités. Les modalités les plus fréquentes sont : ${top3}.`,
    limites: `Pour une variable qualitative nominale, seul le mode est un indicateur valide. La médiane, la moyenne, la variance, les quartiles et les indicateurs de forme (γ1, γ2) ne sont PAS applicables car les modalités ne sont ni numériques ni ordonnables.`,
    graphiques: `Les graphiques adaptés sont le diagramme en tuyaux d'orgues (barres séparées, hauteur = ni) et le diagramme circulaire (angle = fi × 360°). L'histogramme, la boîte à moustaches et la courbe cumulative ne sont PAS applicables.`,
    concentration: `Les indicateurs de concentration (indice de Gini, courbe de Lorenz) ne sont PAS applicables à une variable qualitative nominale.`,
  };
}
