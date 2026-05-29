// src/lib/engines/continue_egales/interpretations.ts

import { CentralTendency, Dispersion, Forme, Concentration } from '@/types/statistics';

export function interpretEgales(
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
    quartiles: `Q1 = ${dispersion.Q1} (25% des valeurs ≤ Q1). Q3 = ${dispersion.Q3} (75% ≤ Q3). IQ = ${dispersion.IQ}. 50% des valeurs centrales ∈ [Q1 ; Q3].`,
    deciles: `D1 = ${dispersion.D1}, D9 = ${dispersion.D9}. Écart interdécile = ${dispersion.ecartInterdecile}. 80% des valeurs ∈ [D1 ; D9].`,
    asymetrie: forme.gamma1Detail || '',
    aplatissement: forme.gamma2Detail || '',
    tableau: `Distribution continue classée en ${total} observations. Les classes sont d'amplitudes égales. La colonne densité (di) est facultative dans ce cas car les hauteurs ni sont directement comparables.`,
  };

  if (central.moyenne !== null && central.mediane !== null) {
    const moy = central.moyenne;
    const med = central.mediane;
    const mo = typeof central.mode === 'number' ? central.mode : null;
    if (mo !== null) {
      i.synthese_position = `X̄ = ${moy}, Me = ${med}, Mo = ${mo}. `;
      if (Math.abs(moy - med) / moy < 0.05) i.synthese_position += 'Distribution approximativement symétrique.';
      else if (moy > med) i.synthese_position += 'X̄ > Me → asymétrie positive.';
      else i.synthese_position += 'X̄ < Me → asymétrie négative.';
    }
  }

  if (concentration) i.concentration = concentration.giniDetail || '';

  return i;
}
