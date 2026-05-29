// src/lib/engines/qualitative_ordinale/interpretations.ts

import { FrequencyRow, CentralTendency } from '@/types/statistics';

export function interpretOrdinale(
  rows: FrequencyRow[],
  central: CentralTendency,
  total: number
): Record<string, string> {
  const modeRow = rows.find(r => r.modalite === central.mode);

  return {
    mode: `Le mode est « ${central.mode} » avec un effectif de ${modeRow?.ni} individus. C'est la modalité la plus fréquente.`,
    mediane: central.medianeDetail || '',
    tableau: `La distribution comprend ${total} observations réparties en ${rows.length} modalités ordonnées. Les fréquences cumulées croissantes (Ficc) et décroissantes (Ficd) permettent de situer la position de chaque modalité.`,
    limites: `Pour une variable qualitative ordinale SANS codage, on peut calculer le mode et la médiane. La moyenne, la variance, l'écart-type, les quartiles et les coefficients de forme (γ1, γ2) ne sont PAS applicables. Pour les obtenir, il faut effectuer un codage numérique.`,
    graphiques: `Les graphiques adaptés sont : le diagramme en tuyaux d'orgues, le diagramme circulaire et la courbe cumulative des fréquences. L'histogramme et la boîte à moustaches ne sont PAS applicables.`,
    concentration: `Les indicateurs de concentration ne sont PAS applicables à une variable qualitative ordinale sans codage.`,
  };
}
