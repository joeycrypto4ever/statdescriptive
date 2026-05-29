// src/lib/engines/qualitative_ordinale/graphiques.ts

export function getCompatibleCharts(): string[] {
  return ['barres', 'circulaire', 'cumulative'];
}

export const ORDINALE_CHART_NOTES: Record<string, string> = {
  barres: 'Le diagramme en tuyaux d\'orgues pour une variable ordinale respecte l\'ordre naturel des modalités sur l\'axe horizontal.',
  circulaire: 'Le diagramme circulaire représente chaque modalité par un secteur d\'angle αi = fi × 360°.',
  cumulative: 'La courbe cumulative des fréquences permet de lire graphiquement la médiane : c\'est la modalité correspondant à Ficc = 0,5.',
};
