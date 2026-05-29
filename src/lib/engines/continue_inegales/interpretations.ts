// src/lib/engines/continue_inegales/interpretations.ts

import { CentralTendency, Dispersion, Forme, Concentration } from '@/types/statistics';

export function interpretInegales(
  central: CentralTendency,
  dispersion: Dispersion,
  forme: Forme,
  concentration: Concentration | null,
  total: number
): Record<string, string> {
  const i: Record<string, string> = {
    mode: central.modeDetail || '',
    mediane: central.medianeDetail || '',
    moyenne: central.moyenneDetail || '',
    dispersion: dispersion.varianceDetail || '',
    cv: dispersion.cvDetail || '',
    quartiles: `Q1 = ${dispersion.Q1}, Q3 = ${dispersion.Q3}, IQ = ${dispersion.IQ}. 50% des valeurs ∈ [Q1;Q3].`,
    deciles: `D1 = ${dispersion.D1}, D9 = ${dispersion.D9}. Écart interdécile = ${dispersion.ecartInterdecile}.`,
    asymetrie: forme.gamma1Detail || '',
    aplatissement: forme.gamma2Detail || '',
    tableau: `Distribution continue à classes INÉGALES (${total} observations). Les colonnes densité (di = ni/ai) et effectifs corrigés (nic = di × ppcm) sont OBLIGATOIRES. La classe modale se détermine par di le plus élevé, PAS par ni.`,
    piege: `⚠ PIÈGE CLASSIQUE : Ne jamais confondre l'effectif le plus élevé avec la classe modale quand les amplitudes sont inégales. Toujours utiliser la densité di.`,
  };

  if (central.moyenne !== null && central.mediane !== null) {
    const moy = central.moyenne;
    const med = central.mediane;
    const mo = typeof central.mode === 'number' ? central.mode : null;
    if (mo !== null) {
      i.synthese_position = `X̄ = ${moy}, Me = ${med}, Mo = ${mo}. `;
      if (moy > med) i.synthese_position += 'Asymétrie positive.';
      else if (moy < med) i.synthese_position += 'Asymétrie négative.';
      else i.synthese_position += 'Distribution symétrique.';
    }
  }

  if (concentration) i.concentration = concentration.giniDetail || '';

  return i;
}
