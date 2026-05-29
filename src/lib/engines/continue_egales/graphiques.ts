// src/lib/engines/continue_egales/graphiques.ts

export function getCompatibleCharts(): string[] {
  return ['histogramme', 'polygone', 'cumulative', 'boite', 'lorenz'];
}

export const EGALES_CHART_NOTES: Record<string, string> = {
  histogramme: 'Histogramme à barres jointives. Pour des classes d\'amplitudes égales, la hauteur des barres est proportionnelle à ni (ou fi). Les surfaces sont proportionnelles aux fréquences.',
  polygone: 'Le polygone des fréquences relie les points (ci, ni) situés au centre de chaque classe.',
  cumulative: 'La courbe cumulative (ogive) permet la lecture graphique de Me, Q1, Q3, D1, D9 par interpolation linéaire.',
  boite: 'La boîte à moustaches : boîte de Q1 à Q3, trait médian. Moustache droite = Min(xmax ; Q3+1,5×IQ). Moustache gauche = Max(xmin ; Q1−1,5×IQ).',
  lorenz: 'Courbe de Lorenz : points (Fi, Gi). L\'écart à la diagonale d\'égalité mesure la concentration. IG = 1 − Σfi(Gi-1 + Gi).',
};
