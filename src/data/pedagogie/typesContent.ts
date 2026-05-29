// src/data/pedagogie/typesContent.ts

export interface TypePedagogique {
  id: string;
  titre: string;
  definition: string;
  caracteristiques: string[];
  exemples: string[];
  donneesCompatibles: string[];
  tableauCompatible: string[];
  indicateursCompatibles: string[];
  graphiquesCompatibles: string[];
  erreurs: string[];
}

export const TYPES_CONTENT: TypePedagogique[] = [
  {
    id: 'qualitative_nominale',
    titre: 'Variable Qualitative Nominale',
    definition: 'Modalités non numériques et non ordonnables. On ne peut pas établir de relation d\'ordre entre les modalités.',
    caracteristiques: [
      'Les modalités sont des catégories sans ordre naturel',
      'On ne peut pas dire qu\'une modalité est « supérieure » à une autre',
      'Seul le dénombrement (comptage) est possible',
    ],
    exemples: ['Couleur des voitures (bleu, rouge, vert)', 'Nationalité (marocain, français, espagnol)', 'État matrimonial (célibataire, marié, veuf, divorcé)'],
    donneesCompatibles: ['Valeurs brutes : Bleu, Rouge, Bleu, Vert...', 'Format effectif : Bleu,45 / Rouge,34 / Vert,21'],
    tableauCompatible: ['Modalité', 'ni (effectif)', 'fi (fréquence)', 'fi en %', 'αi = fi × 360° (angle)'],
    indicateursCompatibles: ['Mode uniquement = modalité avec ni le plus élevé', 'Pas de médiane, pas de moyenne, pas de variance'],
    graphiquesCompatibles: ['Diagramme en tuyaux d\'orgues (barres séparées)', 'Diagramme circulaire (secteurs)'],
    erreurs: ['Calculer une moyenne sur des catégories', 'Utiliser un histogramme (réservé aux continues)', 'Appliquer la boîte à moustaches', 'Calculer la variance ou l\'écart-type'],
  },
  {
    id: 'qualitative_ordinale',
    titre: 'Variable Qualitative Ordinale',
    definition: 'Modalités non numériques mais ordonnables naturellement. Il existe un ordre logique entre les catégories.',
    caracteristiques: [
      'Les modalités peuvent être classées : nul < médiocre < moyen < bien < excellent',
      'L\'ordre est naturel et consensuel',
      'Les fréquences cumulées ont un sens',
    ],
    exemples: ['Niveau d\'appréciation (nul, médiocre, moyen, bien, excellent)', 'Taille de chemise (XS, S, M, L, XL, XXL)', 'Satisfaction (très insatisfait → très satisfait)'],
    donneesCompatibles: ['Valeurs brutes : bon, moyen, excellent...', 'Format effectif : nul,5 / médiocre,12 / moyen,18'],
    tableauCompatible: ['Modalité', 'ni', 'fi', 'fi(%)', 'Nicc', 'Ficc', 'Ficd'],
    indicateursCompatibles: ['Mode = modalité avec ni le plus élevé', 'Médiane = modalité où Ficc franchit 0,5', 'Pas de moyenne, pas de variance, pas de γ1 ni γ2'],
    graphiquesCompatibles: ['Diagramme en tuyaux d\'orgues', 'Diagramme circulaire', 'Courbe cumulative des fréquences'],
    erreurs: ['Ne pas ordonner les modalités avant l\'analyse', 'Calculer une moyenne sans codage', 'Utiliser un histogramme'],
  },
  {
    id: 'codage',
    titre: 'Ordinale avec Codage',
    definition: 'Les modalités ordinales sont transformées en valeurs numériques en respectant l\'ordre naturel. Cela permet d\'appliquer tous les indicateurs quantitatifs.',
    caracteristiques: [
      'Codage : nul → 1, médiocre → 2, moyen → 3, bien → 4, excellent → 5',
      'Transforme une variable qualitative ordinale en quantitative discrète',
      'Permet la moyenne, la variance, les quartiles, la boîte à moustaches',
    ],
    exemples: ['Satisfaction codée : très insatisfait=1, insatisfait=2, neutre=3, satisfait=4, très satisfait=5'],
    donneesCompatibles: ['Modalités textuelles avec effectifs', 'L\'application génère automatiquement le codage'],
    tableauCompatible: ['Modalité (code)', 'xi', 'ni', 'fi', 'fi(%)', 'Nicc', 'Nicd', 'Ficc', 'Ficd'],
    indicateursCompatibles: ['Mode', 'Médiane', 'Moyenne X̄', 'Variance V(X)', 'Écart-type σ', 'CV', 'Q1, Q3, IQ', 'D1, D9', 'γ1 (asymétrie)', 'γ2 (aplatissement)'],
    graphiquesCompatibles: ['Diagramme en barres', 'Circulaire', 'Bâtons', 'Cumulative', 'Boîte à moustaches', 'Courbe de Lorenz'],
    erreurs: ['Coder dans le mauvais ordre (inverser l\'échelle)', 'Ne pas respecter l\'ordre naturel des modalités'],
  },
  {
    id: 'quantitative_discrete',
    titre: 'Variable Quantitative Discrète',
    definition: 'Valeurs numériques isolées, entières ou non. L\'ensemble des modalités est discret (dénombrable).',
    caracteristiques: [
      'Les valeurs sont des nombres isolés',
      'On peut les ordonner et calculer des opérations arithmétiques',
      'Tous les indicateurs statistiques sont applicables',
    ],
    exemples: ['Nombre d\'enfants par famille (0, 1, 2, 3, 4)', 'Nombre d\'accidents par mois', 'Notes entières des étudiants'],
    donneesCompatibles: ['Valeurs brutes : 0, 2, 1, 3, 2, 0...', 'Format effectif : 0,6 / 1,4 / 2,5'],
    tableauCompatible: ['xi', 'ni', 'fi', 'fi(%)', 'Nicc', 'Nicd', 'Ficc', 'Ficd'],
    indicateursCompatibles: ['Mode', 'Médiane', 'Moyenne X̄ = Σfi×xi', 'Variance V(X) = Σfi(xi−X̄)²', 'Écart-type σ', 'CV', 'Q1, Q3, IQ', 'D1, D9', 'γ1, γ2', 'Indice de Gini'],
    graphiquesCompatibles: ['Diagramme en bâtons', 'Courbe cumulative', 'Boîte à moustaches', 'Courbe de Lorenz'],
    erreurs: ['Utiliser un histogramme (réservé aux continues)', 'Confondre bâtons (séparés) et barres d\'histogramme (jointives)'],
  },
  {
    id: 'continue_egales',
    titre: 'Continue à Classes Égales',
    definition: 'Valeurs regroupées en classes toutes de même largeur (amplitude). La colonne densité est facultative.',
    caracteristiques: [
      'Toutes les classes ont la même amplitude ai',
      'La classe modale est celle avec ni le plus élevé (directement)',
      'La colonne densité di est facultative car les hauteurs ni sont directement comparables',
      'Les centres de classe ci = (borne inf + borne sup) / 2 remplacent xi dans les formules',
    ],
    exemples: ['Notes groupées : [0;5[, [5;10[, [10;15[, [15;20[', 'Tailles en cm : [155;160[, [160;165[, [165;170['],
    donneesCompatibles: ['Format classe : [0;5[,2 / [5;10[,7 / [10;15[,18', 'Valeurs brutes (l\'application génère les classes automatiquement)'],
    tableauCompatible: ['Classe', 'ni', 'ai', 'ci', 'fi', 'fi(%)', 'Ficc', 'Ficd', 'Nicc', 'Nicd'],
    indicateursCompatibles: ['Mode (Thalès)', 'Médiane (interpolation)', 'Moyenne (ci)', 'Variance, σ, CV', 'Q1, Q3, IQ, D1, D9', 'γ1, γ2', 'Gini, Lorenz'],
    graphiquesCompatibles: ['Histogramme (hauteur = ni)', 'Polygone des fréquences', 'Courbe cumulative ogive', 'Boîte à moustaches', 'Courbe de Lorenz'],
    erreurs: ['Oublier d\'utiliser les centres de classe ci dans les formules', 'Confondre avec des classes inégales'],
  },
  {
    id: 'continue_inegales',
    titre: 'Continue à Classes Inégales',
    definition: 'Classes de largeurs différentes. C\'est le cas le plus complet et le plus piégeux en statistique descriptive.',
    caracteristiques: [
      'Les amplitudes ai varient d\'une classe à l\'autre',
      '⚠ La classe modale est celle avec la densité di la plus élevée (PAS ni)',
      'La colonne densité di = ni/ai est OBLIGATOIRE',
      'Les effectifs corrigés nic = di × ppcm(ai) permettent la comparaison',
      'L\'histogramme doit utiliser la hauteur = di (pas ni)',
    ],
    exemples: ['Salaires : [10;20[, [20;40[, [40;80[, [80;100[', 'Âges : [20;25[, [25;30[, [30;35[, [35;40[, [40;50[, [50;60['],
    donneesCompatibles: ['Format classe avec amplitudes différentes : [20;25[,9 / [25;30[,17 / [40;50[,45'],
    tableauCompatible: ['Classe', 'ni', 'ai', 'ci', 'fi', 'di=ni/ai', 'nic=di×ppcm', 'Ficc', 'Ficd', 'Nicc', 'Nicd'],
    indicateursCompatibles: ['Mode (di max + Thalès)', 'Médiane (interpolation)', 'Moyenne (ci)', 'Variance, σ, CV', 'Q1, Q3, IQ', 'γ1, γ2', 'Gini, Lorenz'],
    graphiquesCompatibles: ['Histogramme (hauteur = di obligatoirement)', 'Polygone effectifs corrigés', 'Cumulative ogive', 'Boîte à moustaches', 'Courbe de Lorenz'],
    erreurs: [
      '⚠ PIÈGE : prendre la classe avec ni le plus élevé comme classe modale',
      'Utiliser ni au lieu de di pour l\'histogramme',
      'Oublier les effectifs corrigés nic',
      'Ne pas calculer le ppcm des amplitudes',
    ],
  },
];
