// src/data/pedagogie/graphiquesContent.ts

export interface GraphPedagogique {
  id: string;
  titre: string;
  definition: string;
  utilite: string;
  typesCompatibles: string[];
  interpretation: string;
  details?: string[];
}

export const GRAPHIQUES_CONTENT: GraphPedagogique[] = [
  {
    id: 'barres', titre: 'Diagramme en barres (tuyaux d\'orgues)',
    definition: 'Graphique composé de barres verticales séparées, de hauteur proportionnelle à l\'effectif ni.',
    utilite: 'Visualiser la répartition des effectifs pour les variables qualitatives.',
    typesCompatibles: ['Qualitative nominale', 'Qualitative ordinale', 'Ordinale codée'],
    interpretation: 'La barre la plus haute correspond au mode. Pour les ordinales, les barres respectent l\'ordre naturel.',
  },
  {
    id: 'circulaire', titre: 'Diagramme circulaire',
    definition: 'Le cercle est divisé en secteurs dont l\'angle est proportionnel à la fréquence: αi = fi × 360°.',
    utilite: 'Visualiser les proportions relatives de chaque modalité.',
    typesCompatibles: ['Qualitative nominale', 'Qualitative ordinale', 'Ordinale codée'],
    interpretation: 'Le plus grand secteur correspond au mode. Permet de voir rapidement les parts relatives.',
  },
  {
    id: 'histogramme', titre: 'Histogramme',
    definition: 'Graphique à barres JOINTIVES pour les variables continues classées.',
    utilite: 'Visualiser la distribution d\'une variable continue. Les surfaces sont proportionnelles aux fréquences.',
    typesCompatibles: ['Continue égales', 'Continue inégales'],
    interpretation: 'Classes égales: hauteur = ni (ou fi). Classes INÉGALES: hauteur = di OBLIGATOIREMENT pour que les surfaces restent proportionnelles aux fréquences.',
    details: [
      'Les barres sont jointives car les classes sont contiguës',
      'Pour les classes inégales, utiliser di = ni/ai comme hauteur',
      'La surface de chaque barre est proportionnelle à fi',
    ],
  },
  {
    id: 'polygone', titre: 'Polygone des fréquences',
    definition: 'Ligne brisée reliant les points placés au centre de chaque classe (ci, ni) ou (ci, nic).',
    utilite: 'Visualiser la forme de la distribution continue.',
    typesCompatibles: ['Continue égales', 'Continue inégales'],
    interpretation: 'Pour les classes inégales, on utilise les effectifs corrigés nic pour le polygone.',
  },
  {
    id: 'cumulative', titre: 'Courbe cumulative',
    definition: 'Courbe des fréquences cumulées croissantes (Ficc). Pour les classées, c\'est une ogive.',
    utilite: 'Lecture graphique de la médiane (Ficc = 0,5), des quartiles Q1 (0,25) et Q3 (0,75).',
    typesCompatibles: ['Qualitative ordinale', 'Quantitative discrète', 'Continue égales', 'Continue inégales'],
    interpretation: 'Le point d\'intersection avec l\'horizontale à 0,5 donne la médiane. Avec 0,25 → Q1, avec 0,75 → Q3.',
  },
  {
    id: 'boite', titre: 'Boîte à moustaches (Box-plot)',
    definition: 'Représentation schématique utilisant les quartiles. Boîte de Q1 à Q3, trait médian à Me.',
    utilite: 'Résumer la distribution et détecter les valeurs aberrantes.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
    interpretation: 'La boîte contient 50% des valeurs centrales. Les moustaches s\'étendent jusqu\'aux valeurs extrêmes non aberrantes.',
    details: [
      'Minimum et Maximum de la série',
      'Q1 : premier quartile (25%)',
      'Médiane : trait central dans la boîte',
      'Q3 : troisième quartile (75%)',
      'IQ = Q3 − Q1 : intervalle interquartile',
      'Moustache droite = Min(xmax ; Q3 + 1,5×IQ)',
      'Moustache gauche = Max(xmin ; Q1 − 1,5×IQ)',
      'Points au-delà des moustaches = valeurs aberrantes',
    ],
  },
  {
    id: 'lorenz', titre: 'Courbe de Lorenz',
    definition: 'Ligne polygonale reliant les points (Fi, Gi) où Fi = fréquences cumulées et Gi = masses cumulées.',
    utilite: 'Mesurer la concentration de la distribution et calculer l\'indice de Gini.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
    interpretation: 'La diagonale d\'égalité (droite y = x) représente l\'égalité parfaite. Plus la courbe s\'éloigne de cette diagonale, plus la concentration est forte.',
    details: [
      'La diagonale d\'égalité: si chaque individu possédait la même part de la masse totale',
      'L\'aire entre la courbe et la diagonale mesure la concentration',
      'Indice de Gini = 2 × cette aire',
      'IG = 0 → égalité parfaite (courbe = diagonale)',
      'IG → 1 → concentration maximale (courbe collée aux axes)',
    ],
  },
];
