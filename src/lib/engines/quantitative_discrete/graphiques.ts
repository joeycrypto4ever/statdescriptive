// src/lib/engines/quantitative_discrete/graphiques.ts

export function getCompatibleCharts(): string[] {
  return ['batons', 'cumulative', 'boite', 'lorenz'];
}

export const DISCRETE_CHART_NOTES: Record<string, string> = {
  batons: 'Le diagramme en bâtons représente chaque valeur xi par un bâton vertical de hauteur ni. Les bâtons sont séparés car les valeurs sont isolées (discrètes).',
  cumulative: 'La courbe cumulative des fréquences permet la lecture graphique de la médiane (Ficc = 0,5), des quartiles Q1 (0,25) et Q3 (0,75), et des déciles.',
  boite: 'La boîte à moustaches résume la distribution : boîte de Q1 à Q3, trait à la médiane. Moustache droite = Min(xmax ; Q3 + 1,5×IQ). Moustache gauche = Max(xmin ; Q1 − 1,5×IQ). Points isolés = valeurs aberrantes.',
  lorenz: 'La courbe de Lorenz relie les points (Fi, Gi). Plus elle s\'éloigne de la diagonale d\'égalité, plus la concentration est forte. L\'indice de Gini mesure l\'aire entre la courbe et la diagonale.',
};
