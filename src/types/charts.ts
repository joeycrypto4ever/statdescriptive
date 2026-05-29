// src/types/charts.ts

import { StatType } from './statistics';

export interface ChartConfig {
  type: string;
  label: string;
  compatibleTypes: StatType[];
  description: string;
}

export const CHART_CONFIGS: ChartConfig[] = [
  {
    type: 'barres',
    label: 'Diagramme en barres (tuyaux d\'orgues)',
    compatibleTypes: ['qualitative_nominale', 'qualitative_ordinale', 'codage'],
    description: 'Représente les effectifs par des barres de hauteur proportionnelle à ni.'
  },
  {
    type: 'circulaire',
    label: 'Diagramme circulaire',
    compatibleTypes: ['qualitative_nominale', 'qualitative_ordinale', 'codage'],
    description: 'Chaque modalité est représentée par un secteur d\'angle αi = fi × 360°.'
  },
  {
    type: 'batons',
    label: 'Diagramme en bâtons',
    compatibleTypes: ['quantitative_discrete', 'codage'],
    description: 'Représente les effectifs par des bâtons verticaux aux valeurs xi.'
  },
  {
    type: 'histogramme',
    label: 'Histogramme',
    compatibleTypes: ['continue_egales', 'continue_inegales'],
    description: 'Barres jointives. Hauteur = ni (classes égales) ou di (classes inégales).'
  },
  {
    type: 'polygone',
    label: 'Polygone des fréquences',
    compatibleTypes: ['continue_egales', 'continue_inegales'],
    description: 'Ligne reliant les centres de classes ci.'
  },
  {
    type: 'cumulative',
    label: 'Courbe cumulative',
    compatibleTypes: ['qualitative_ordinale', 'codage', 'quantitative_discrete', 'continue_egales', 'continue_inegales'],
    description: 'Courbe des fréquences cumulées croissantes pour lecture de Me, Q1, Q3.'
  },
  {
    type: 'boite',
    label: 'Boîte à moustaches',
    compatibleTypes: ['quantitative_discrete', 'codage', 'continue_egales', 'continue_inegales'],
    description: 'Boîte de Q1 à Q3, trait médian, moustaches et valeurs aberrantes.'
  },
  {
    type: 'lorenz',
    label: 'Courbe de Lorenz',
    compatibleTypes: ['quantitative_discrete', 'codage', 'continue_egales', 'continue_inegales'],
    description: 'Courbe de concentration reliant les points (Fi, Gi) avec la diagonale d\'égalité.'
  }
];
