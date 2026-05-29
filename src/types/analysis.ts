// src/types/analysis.ts

import { StatType, AnalysisResult } from './statistics';

export interface ParsedData {
  headers: string[];
  rows: Record<string, string>[];
  raw: string;
}

export interface VariableInfo {
  name: string;
  isAnalyzable: boolean;
  isIdentifier: boolean;
  sampleValues: string[];
  uniqueCount: number;
  totalCount: number;
  isNumeric: boolean;
  isClass: boolean;
}

export interface AnalysisConfig {
  variable: string;
  type: StatType;
  data: ParsedData;
  ordinalOrder?: string[];
  autoDetected: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  variable: string;
  type: StatType;
  effectifTotal: number;
  result: AnalysisResult;
  rawData: string;
}

export interface AnalysisState {
  step: 'input' | 'variable_select' | 'type_select' | 'ordinal_order' | 'results';
  rawCsv: string;
  parsedData: ParsedData | null;
  variables: VariableInfo[];
  selectedVariable: string;
  selectedType: StatType | 'auto';
  detectedType: StatType | null;
  ordinalOrder: string[];
  result: AnalysisResult | null;
  error: string | null;
}
