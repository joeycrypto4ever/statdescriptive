// src/lib/engines/continue_inegales/graphiques.ts

export function getCompatibleCharts(): string[] {
  return ['histogramme', 'polygone', 'cumulative', 'boite', 'lorenz'];
}

export const INEGALES_CHART_NOTES: Record<string, string> = {
  histogramme: '⚠ IMPORTANT : pour des classes d\'amplitudes inégales, la hauteur des barres de l\'histogramme doit être la DENSITÉ di = ni/ai (et NON ni). Cela garantit que les surfaces des barres restent proportionnelles aux fréquences.',
  polygone: 'Le polygone des effectifs corrigés (nic = di × ppcm(ai)) permet une visualisation comparable entre classes d\'amplitudes différentes.',
  cumulative: 'Courbe cumulative ogive pour lecture de Me, Q1, Q3 par interpolation.',
  boite: 'Boîte à moustaches calculée par interpolation dans les classes.',
  lorenz: 'Courbe de Lorenz et indice de Gini. IG = 1 − Σfi(Gi-1 + Gi). IG = 0 → égalité parfaite, IG → 1 → concentration maximale.',
};
