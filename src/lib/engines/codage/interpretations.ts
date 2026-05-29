// src/lib/engines/codage/interpretations.ts

import { FrequencyRow, CentralTendency, Dispersion, Forme } from '@/types/statistics';

export function interpretCodage(
  rows: FrequencyRow[],
  central: CentralTendency,
  dispersion: Dispersion,
  forme: Forme,
  total: number,
  codageMap: Record<string, number>
): Record<string, string> {
  const codageExplain = Object.entries(codageMap)
    .map(([k, v]) => `${k} → ${v}`)
    .join(' | ');

  return {
    codage: `Le codage numérique appliqué est : ${codageExplain}. Ce codage transforme la variable qualitative ordinale en variable quantitative discrète, ce qui permet d'appliquer tous les indicateurs numériques.`,
    mode: central.modeDetail || '',
    mediane: central.medianeDetail || '',
    moyenne: central.moyenneDetail || '',
    dispersion: dispersion.varianceDetail || '',
    cv: dispersion.cvDetail || '',
    asymetrie: forme.gamma1Detail || '',
    aplatissement: forme.gamma2Detail || '',
    synthese: buildSynthese(central, dispersion, forme),
    tableau: `La distribution comprend ${total} observations. Après codage, les ${rows.length} modalités sont traitées comme des valeurs numériques discrètes.`,
  };
}

function buildSynthese(central: CentralTendency, dispersion: Dispersion, forme: Forme): string {
  const parts: string[] = [];

  if (central.moyenne !== null && central.mediane !== null) {
    if (Math.abs(central.moyenne - central.mediane) < 0.3) {
      parts.push('La moyenne et la médiane sont proches, suggérant une distribution relativement symétrique.');
    } else if (central.moyenne > central.mediane) {
      parts.push('La moyenne est supérieure à la médiane, indiquant une asymétrie positive (étalée à droite).');
    } else {
      parts.push('La moyenne est inférieure à la médiane, indiquant une asymétrie négative (étalée à gauche).');
    }
  }

  if (dispersion.CV !== null) {
    if (dispersion.CV < 0.15) parts.push('Le CV faible indique une bonne homogénéité.');
    else if (dispersion.CV > 0.30) parts.push('Le CV élevé indique une forte hétérogénéité.');
  }

  return parts.join(' ');
}
