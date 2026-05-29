// src/lib/engines/qualitative_nominale/graphiques.ts

/** Compatible charts for qualitative nominale */
export function getCompatibleCharts(): string[] {
  return ['barres', 'circulaire'];
}

/** Explanation text for nominale charts */
export const NOMINALE_CHART_NOTES: Record<string, string> = {
  barres: 'Le diagramme en tuyaux d\'orgues représente chaque modalité par une barre de hauteur proportionnelle à son effectif ni. Les barres sont séparées car les modalités ne sont pas ordonnées.',
  circulaire: 'Le diagramme circulaire divise le cercle en secteurs proportionnels aux fréquences. L\'angle de chaque secteur est αi = fi × 360°.',
};
