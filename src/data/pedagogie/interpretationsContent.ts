// src/data/pedagogie/interpretationsContent.ts

export const INTERPRETATIONS_GUIDE = {
  position: {
    titre: 'Relation entre les paramètres de position',
    contenu: `La moyenne, la médiane et le mode sont liés à la forme de la distribution :
- Distribution symétrique : X̄ ≈ Me ≈ Mo
- Asymétrie positive (étalée à droite) : Mo < Me < X̄
- Asymétrie négative (étalée à gauche) : X̄ < Me < Mo
La moyenne est influencée par les valeurs extrêmes, pas la médiane.`,
  },
  dispersion: {
    titre: 'Interprétation de la dispersion',
    contenu: `• L'étendue donne l'intervalle total de la distribution
- L'IQ = Q3−Q1 contient 50% des valeurs centrales
- L'écart interdécile D9−D1 contient 80% des valeurs
- La variance exprime la dispersion autour de la moyenne (unité²)
- L'écart-type σ a la même unité que la variable
- Le CV permet de comparer des distributions de natures différentes`,
  },
  forme: {
    titre: 'Conditions de normalité',
    contenu: `Pour qu'une variable puisse être considérée comme suivant une loi normale :
- Le coefficient d'asymétrie γ1 doit être dans [−1, 1]
- Le coefficient d'aplatissement γ2 doit être dans [−1,5 ; 1,5]
Si ces deux conditions sont remplies, la distribution est comparable à la loi de Gauss.`,
  },
  concentration: {
    titre: 'Interprétation de la concentration',
    contenu: `La courbe de Lorenz et l'indice de Gini mesurent les inégalités :
- IG = 0 → égalité parfaite (tous les individus ont la même part)
- IG < 0,3 → faible concentration
- 0,3 ≤ IG < 0,6 → concentration moyenne
- IG ≥ 0,6 → forte concentration
- IG = 1 → concentration maximale (un seul individu possède tout)`,
  },
};
