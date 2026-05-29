// src/lib/utils/constants.ts

import { StatType } from '@/types/statistics';

export const TYPE_LABELS: Record<StatType, string> = {
  qualitative_nominale: 'Qualitative Nominale',
  qualitative_ordinale: 'Qualitative Ordinale',
  codage: 'Ordinale avec Codage',
  quantitative_discrete: 'Quantitative Discrète',
  continue_egales: 'Continue à Classes Égales',
  continue_inegales: 'Continue à Classes Inégales',
};

export const TYPE_DESCRIPTIONS: Record<StatType, string> = {
  qualitative_nominale: 'Modalités non numériques et non ordonnables (couleurs, nationalités, état matrimonial…)',
  qualitative_ordinale: 'Modalités non numériques mais ordonnables naturellement (nul < médiocre < moyen < bien < excellent)',
  codage: 'Variable ordinale transformée en valeurs numériques tout en respectant l\'ordre naturel',
  quantitative_discrete: 'Valeurs numériques isolées, entières ou non (nombre d\'enfants, nombre d\'accidents…)',
  continue_egales: 'Valeurs regroupées en classes toutes de même largeur (amplitude)',
  continue_inegales: 'Classes de largeurs différentes — cas le plus complet et le plus piégeux',
};

export const COMPATIBLE_INDICATORS: Record<StatType, string[]> = {
  qualitative_nominale: ['mode'],
  qualitative_ordinale: ['mode', 'mediane'],
  codage: ['mode', 'mediane', 'moyenne', 'variance', 'ecartType', 'CV', 'Q1', 'Q3', 'IQ', 'D1', 'D9', 'gamma1', 'gamma2'],
  quantitative_discrete: ['mode', 'mediane', 'moyenne', 'variance', 'ecartType', 'CV', 'etendue', 'Q1', 'Q3', 'IQ', 'D1', 'D9', 'gamma1', 'gamma2'],
  continue_egales: ['mode', 'mediane', 'moyenne', 'variance', 'ecartType', 'CV', 'etendue', 'Q1', 'Q3', 'IQ', 'D1', 'D9', 'gamma1', 'gamma2'],
  continue_inegales: ['mode', 'mediane', 'moyenne', 'variance', 'ecartType', 'CV', 'etendue', 'Q1', 'Q3', 'IQ', 'D1', 'D9', 'gamma1', 'gamma2'],
};

export const COMPATIBLE_CHARTS: Record<StatType, string[]> = {
  qualitative_nominale: ['barres', 'circulaire'],
  qualitative_ordinale: ['barres', 'circulaire', 'cumulative'],
  codage: ['barres', 'circulaire', 'batons', 'cumulative', 'boite', 'lorenz'],
  quantitative_discrete: ['batons', 'cumulative', 'boite', 'lorenz'],
  continue_egales: ['histogramme', 'polygone', 'cumulative', 'boite', 'lorenz'],
  continue_inegales: ['histogramme', 'polygone', 'cumulative', 'boite', 'lorenz'],
};

export const COMPATIBLE_CONCENTRATION: Record<StatType, boolean> = {
  qualitative_nominale: false,
  qualitative_ordinale: false,
  codage: true,
  quantitative_discrete: true,
  continue_egales: true,
  continue_inegales: true,
};

export const ORDINAL_SCALES: Record<string, string[]> = {
  satisfaction: ['Très insatisfait', 'Insatisfait', 'Neutre', 'Satisfait', 'Très satisfait'],
  niveau: ['Nul', 'Médiocre', 'Moyen', 'Bien', 'Excellent'],
  appreciation: ['Nulle', 'Médiocre', 'Moyenne', 'Assez bonne', 'Très bonne', 'Excellente'],
  taille: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  accord: ['Pas du tout d\'accord', 'Pas d\'accord', 'Neutre', 'D\'accord', 'Tout à fait d\'accord'],
  frequence: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'],
  mention: ['Passable', 'Assez bien', 'Bien', 'Très bien'],
};

export const CLASS_REGEX = /^\[[\d.,]+[;:][\d.,]+\[$/;
