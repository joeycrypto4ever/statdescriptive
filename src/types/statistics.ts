// src/types/statistics.ts

export type StatType =
  | 'qualitative_nominale'
  | 'qualitative_ordinale'
  | 'codage'
  | 'quantitative_discrete'
  | 'continue_egales'
  | 'continue_inegales';

export interface FrequencyRow {
  modalite: string;
  xi: number | null;
  ni: number;
  fi: number;
  fiPercent: number;
  angleDeg?: number;
  Nicc?: number;
  Nicd?: number;
  Ficc?: number;
  Ficd?: number;
}

export interface ClassRow {
  classe: string;
  borneInf: number;
  borneSup: number;
  ni: number;
  ai: number;
  ci: number;
  fi: number;
  fiPercent: number;
  di?: number;
  nic?: number;
  Nicc: number;
  Nicd: number;
  Ficc: number;
  Ficd: number;
}

export interface ConcentrationRow {
  modalite: string;
  ni: number;
  ci: number;
  si: number;
  gi: number;
  Gi: number;
  fi: number;
  Fi: number;
  GiPrevPlusGi: number;
  product: number;
}

export interface CentralTendency {
  mode: string | number;
  modeLabel?: string;
  classeModale?: string;
  mediane: number | null;
  moyenne: number | null;
  medianeDetail?: string;
  modeDetail?: string;
  moyenneDetail?: string;
}

export interface Dispersion {
  variance: number | null;
  ecartType: number | null;
  etendue: number | null;
  Q1: number | null;
  Q3: number | null;
  IQ: number | null;
  D1: number | null;
  D9: number | null;
  ecartInterdecile: number | null;
  CV: number | null;
  varianceDetail?: string;
  cvDetail?: string;
}

export interface Forme {
  mu3: number | null;
  mu4: number | null;
  gamma1: number | null;
  gamma2: number | null;
  gamma1Detail?: string;
  gamma2Detail?: string;
}

export interface Concentration {
  tableau: ConcentrationRow[];
  masseGlobale: number;
  indiceGini: number;
  medianeMasse: number | null;
  giniDetail?: string;
  lorenzPoints: { Fi: number; Gi: number }[];
}

export interface BoxPlotData {
  min: number;
  max: number;
  Q1: number;
  mediane: number;
  Q3: number;
  IQ: number;
  moustacheBas: number;
  moustacheHaut: number;
  valeursAberrantes: number[];
}

export interface AnalysisResult {
  variable: string;
  type: StatType;
  effectifTotal: number;
  tableau: FrequencyRow[] | ClassRow[];
  centralTendency: CentralTendency;
  dispersion: Dispersion | null;
  forme: Forme | null;
  concentration: Concentration | null;
  boxPlot: BoxPlotData | null;
  compatibleCharts: string[];
  interpretations: Record<string, string>;
}
