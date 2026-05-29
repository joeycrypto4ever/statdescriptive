// src/lib/engines/qualitative_ordinale/calculs.ts

import { CentralTendency } from '@/types/statistics';

/**
 * Ordinale: mode + médiane
 * Médiane = modalité pour laquelle Ficc franchit 0.5
 * Pas de moyenne, pas de variance
 */
export function calculsOrdinale(
  modalites: string[],
  effectifs: number[],
  ordinalOrder: string[]
): CentralTendency {
  // Reorder by ordinal order
  const ordered = ordinalOrder.filter(m =>
    modalites.includes(m)
  );
  const orderedEffectifs = ordered.map(m => {
    const idx = modalites.indexOf(m);
    return effectifs[idx];
  });

  const total = orderedEffectifs.reduce((s, n) => s + n, 0);

  // Mode
  const maxNi = Math.max(...orderedEffectifs);
  const modeIndex = orderedEffectifs.indexOf(maxNi);
  const mode = ordered[modeIndex];

  // Médiane via Ficc
  let cumul = 0;
  let mediane = ordered[0];
  for (let i = 0; i < ordered.length; i++) {
    cumul += orderedEffectifs[i];
    const ficc = cumul / total;
    if (ficc >= 0.5) {
      mediane = ordered[i];
      break;
    }
  }

  return {
    mode,
    modeLabel: mode,
    mediane: null, // stored as label, not number
    medianeDetail: `La médiane est « ${mediane} ». C'est la modalité pour laquelle la fréquence cumulée croissante (Ficc) atteint ou dépasse 0,5 pour la première fois. Cela signifie qu'au moins 50% des individus ont une valeur inférieure ou égale à « ${mediane} ».`,
    moyenne: null,
    modeDetail: `Le mode est « ${mode} » car c'est la modalité avec l'effectif le plus élevé (ni = ${maxNi}).`,
  };
}
