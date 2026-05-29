// src/lib/engines/quantitative_discrete/interpretations.ts

import { CentralTendency, Dispersion, Forme, Concentration } from '@/types/statistics';

export function interpretDiscrete(
  central: CentralTendency,
  dispersion: Dispersion,
  forme: Forme,
  concentration: Concentration | null,
  total: number
): Record<string, string> {
  const interps: Record<string, string> = {
    mode: central.modeDetail || '',
    mediane: central.medianeDetail || '',
    moyenne: central.moyenneDetail || '',
    dispersion: dispersion.varianceDetail || '',
    cv: dispersion.cvDetail || '',
    quartiles: `Q1 = ${dispersion.Q1} → 25% des valeurs sont ≤ Q1. Q3 = ${dispersion.Q3} → 75% des valeurs sont ≤ Q3. IQ = Q3 − Q1 = ${dispersion.IQ} → 50% des valeurs centrales sont dans [Q1 ; Q3].`,
    deciles: `D1 = ${dispersion.D1} → 10% des valeurs sont ≤ D1. D9 = ${dispersion.D9} → 90% des valeurs sont ≤ D9. Écart interdécile = D9 − D1 = ${dispersion.ecartInterdecile} → 80% des valeurs sont dans [D1 ; D9].`,
    asymetrie: forme.gamma1Detail || '',
    aplatissement: forme.gamma2Detail || '',
  };

  // Synthèse position
  if (central.moyenne !== null && central.mediane !== null) {
    const moy = central.moyenne;
    const med = central.mediane;
    const mo = typeof central.mode === 'number' ? central.mode : null;

    if (mo !== null) {
      interps.synthese_position = `Comparaison : X̄ = ${moy}, Me = ${med}, Mo = ${mo}. `;
      if (Math.abs(moy - med) < 0.5 && Math.abs(moy - mo) < 0.5) {
        interps.synthese_position += 'Les trois indicateurs sont proches → distribution approximativement symétrique.';
      } else if (moy > med && med > mo) {
        interps.synthese_position += 'X̄ > Me > Mo → asymétrie positive (étalée vers la droite).';
      } else if (moy < med && med < mo) {
        interps.synthese_position += 'X̄ < Me < Mo → asymétrie négative (étalée vers la gauche).';
      }
    }
  }

  if (concentration) {
    interps.concentration = concentration.giniDetail || '';
  }

  return interps;
}
