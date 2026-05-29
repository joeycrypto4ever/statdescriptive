// src/lib/engines/qualitative_nominale/calculs.ts

import { CentralTendency } from '@/types/statistics';

/** Nominale: only the mode (modalité with highest ni) */
export function calculsNominale(
  modalites: string[],
  effectifs: number[]
): CentralTendency {
  const maxNi = Math.max(...effectifs);
  const modeIndex = effectifs.indexOf(maxNi);
  const mode = modalites[modeIndex];

  return {
    mode,
    modeLabel: mode,
    mediane: null,
    moyenne: null,
    modeDetail: `Le mode est « ${mode} » car c'est la modalité ayant l'effectif le plus élevé (ni = ${maxNi}).`,
  };
}
