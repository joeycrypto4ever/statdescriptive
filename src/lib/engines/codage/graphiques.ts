// src/lib/engines/codage/graphiques.ts

export function getCompatibleCharts(): string[] {
  return ['barres', 'circulaire', 'batons', 'cumulative', 'boite', 'lorenz'];
}

export const CODAGE_CHART_NOTES: Record<string, string> = {
  barres: 'Diagramme en tuyaux d\'orgues avec les modalités ordonnées.',
  circulaire: 'Diagramme circulaire avec angle αi = fi × 360°.',
  batons: 'Diagramme en bâtons utilisant les valeurs codées sur l\'axe des x.',
  cumulative: 'Courbe cumulative permettant la lecture de Me, Q1, Q3.',
  boite: 'Boîte à moustaches calculée sur les valeurs codées.',
  lorenz: 'Courbe de Lorenz et indice de Gini calculés sur les valeurs codées.',
};
