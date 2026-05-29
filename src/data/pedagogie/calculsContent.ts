// src/data/pedagogie/calculsContent.ts

export interface CalculPedagogique {
  id: string;
  titre: string;
  formule: string;
  explication: string;
  etapes: string[];
  interpretation: string;
  typesCompatibles: string[];
}

export const CALCULS_CONTENT: CalculPedagogique[] = [
  {
    id: 'moyenne', titre: 'Moyenne arithmétique',
    formule: 'X̄ = Σ(fi × xi) ou X̄ = Σ(ni × xi) / n. Pour les classées: X̄ = Σ(fi × ci)',
    explication: 'La moyenne est la valeur qui représente toutes les observations comme si elles étaient égales. Elle est sensible aux valeurs extrêmes.',
    etapes: ['Multiplier chaque valeur xi par sa fréquence fi', 'Sommer tous les produits', 'Pour les classées : utiliser ci à la place de xi'],
    interpretation: 'La moyenne donne le centre de gravité de la distribution. Un inconvénient est sa sensibilité aux valeurs extrêmes.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'mediane', titre: 'Médiane',
    formule: 'Rang r = n × 50/100. Si r ∈ ℕ: Me = (xr + xr+1)/2. Si r ∉ ℕ: Me = x⌊r⌋+1. Classée: Me = a + (b−a) × (0,5 − F(a)) / (F(b) − F(a))',
    explication: 'La médiane partage la série ordonnée en deux parties égales. Elle n\'est pas influencée par les valeurs extrêmes.',
    etapes: ['Ordonner les données', 'Calculer le rang r = n/2', 'Si r entier: moyenne des valeurs de rang r et r+1', 'Si r non entier: valeur de rang ⌊r⌋+1', 'Pour les classées: interpolation linéaire dans la classe médiane'],
    interpretation: 'La médiane est plus robuste que la moyenne. Sa valeur ne change pas même si les valeurs extrêmes varient.',
    typesCompatibles: ['Qualitative ordinale', 'Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'mode', titre: 'Mode',
    formule: 'Mo = modalité avec ni le plus élevé. Classées égales: ni max. Classées inégales: di max puis Thalès: Mo = xi + Δ1/(Δ1+Δ2) × (xi+1 − xi)',
    explication: 'Le mode est la valeur la plus fréquente. Pour les classes inégales, on utilise la densité di et non ni.',
    etapes: ['Identifier la classe/valeur avec l\'effectif (ou densité) le plus élevé', 'Pour les classées: appliquer Thalès avec Δ1 et Δ2', 'Δ1 = densité modale − densité précédente', 'Δ2 = densité modale − densité suivante'],
    interpretation: 'Le mode indique la valeur la plus typique. Une série peut être bimodale (deux modes).',
    typesCompatibles: ['Tous les types'],
  },
  {
    id: 'variance', titre: 'Variance et Écart-type',
    formule: 'V(X) = Σfi(xi − X̄)². σ = √V(X)',
    explication: 'La variance mesure la dispersion des valeurs autour de la moyenne. L\'écart-type a la même unité que la variable.',
    etapes: ['Calculer la moyenne X̄', 'Pour chaque xi: calculer (xi − X̄)²', 'Multiplier par fi', 'Sommer → V(X)', 'Racine carrée → σ'],
    interpretation: 'Plus la variance est grande, plus les valeurs sont dispersées. L\'écart-type est plus interprétable car il a la même unité.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'quartiles', titre: 'Quartiles Q1, Q3 et IQ',
    formule: 'Q1: rang = n×25/100. Q3: rang = n×75/100. IQ = Q3 − Q1',
    explication: 'Les quartiles divisent la série en 4 parts égales. 50% des valeurs centrales sont dans [Q1;Q3].',
    etapes: ['Calculer le rang de Q1 = n×0.25', 'Calculer le rang de Q3 = n×0.75', 'Appliquer la même règle que la médiane', 'IQ = Q3 − Q1'],
    interpretation: '25% des valeurs ≤ Q1. 75% des valeurs ≤ Q3. IQ contient 50% des valeurs centrales.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'deciles', titre: 'Déciles D1, D9',
    formule: 'D1: rang = n×10/100. D9: rang = n×90/100. Écart interdécile = D9 − D1',
    explication: 'Les déciles divisent la série en 10 parts. 80% des valeurs sont dans [D1;D9].',
    etapes: ['Calculer rang D1 = n×0.1', 'Calculer rang D9 = n×0.9', 'Appliquer la règle du quantile'],
    interpretation: '10% des valeurs ≤ D1, 90% ≤ D9. L\'écart interdécile couvre 80% des données.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'cv', titre: 'Coefficient de Variation',
    formule: 'CV = σ / X̄',
    explication: 'Nombre sans unité qui permet de comparer la dispersion de séries de natures différentes.',
    etapes: ['Calculer σ et X̄', 'Diviser σ par X̄', 'Exprimer en pourcentage'],
    interpretation: 'CV < 15% → bonne homogénéité. CV > 30% → grande hétérogénéité. Permet de comparer des distributions de natures différentes (ex: poids des éléphants vs souris).',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'gamma1', titre: 'Coefficient d\'asymétrie γ1 (Fisher)',
    formule: 'γ1 = μ3 / σ³ où μ3 = Σfi(xi − X̄)³',
    explication: 'Mesure le degré d\'asymétrie de la distribution par rapport à la moyenne.',
    etapes: ['Calculer μ3 = Σfi(xi − X̄)³', 'Diviser par σ³'],
    interpretation: '−1 ≤ γ1 ≤ 1 → symétrique (X̄ ≈ Me ≈ Mo). γ1 < −1 → étalée à gauche (X̄ < Me < Mo). γ1 > 1 → étalée à droite (X̄ > Me > Mo).',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'gamma2', titre: 'Coefficient d\'aplatissement γ2 (Fisher)',
    formule: 'γ2 = μ4 / σ⁴ − 3 où μ4 = Σfi(xi − X̄)⁴',
    explication: 'Compare l\'aplatissement de la distribution à la loi normale.',
    etapes: ['Calculer μ4 = Σfi(xi − X̄)⁴', 'Diviser par σ⁴', 'Soustraire 3'],
    interpretation: '−1,5 ≤ γ2 ≤ 1,5 → comparable à la normale. γ2 < −1,5 → plus aplatie, valeurs dispersées. γ2 > 1,5 → moins aplatie, forte concentration autour de la moyenne.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'gini', titre: 'Indice de Gini',
    formule: 'IG = 1 − Σfi(Gi-1 + Gi) avec G0 = 0',
    explication: 'Mesure le degré de concentration de la distribution. Basé sur la courbe de Lorenz.',
    etapes: ['Calculer si = ni × xi (masse)', 'S = Σsi (masse globale)', 'gi = si/S', 'Gi = cumul des gi', 'IG = 1 − Σfi(Gi-1 + Gi)'],
    interpretation: 'IG = 0 → égalité parfaite. IG proche de 1 → forte concentration. Plus IG est grand, plus la concentration est forte.',
    typesCompatibles: ['Quantitative discrète', 'Continue égales', 'Continue inégales', 'Ordinale codée'],
  },
  {
    id: 'densite', titre: 'Densité',
    formule: 'di = ni / ai',
    explication: 'La densité rapporte l\'effectif à l\'amplitude de la classe. Obligatoire pour les classes inégales.',
    etapes: ['Calculer l\'amplitude ai = borne sup − borne inf', 'Diviser ni par ai'],
    interpretation: 'Pour les classes inégales, la classe modale est celle avec di le plus élevé (pas ni).',
    typesCompatibles: ['Continue égales (facultatif)', 'Continue inégales (obligatoire)'],
  },
  {
    id: 'effectif_corrige', titre: 'Effectif corrigé',
    formule: 'nic = di × ppcm(ai)',
    explication: 'Permet de comparer visuellement les effectifs entre classes d\'amplitudes différentes.',
    etapes: ['Calculer le ppcm de toutes les amplitudes', 'Multiplier chaque densité di par ce ppcm'],
    interpretation: 'Les effectifs corrigés rendent les classes comparables sur un même graphique.',
    typesCompatibles: ['Continue inégales (obligatoire)'],
  },
];
