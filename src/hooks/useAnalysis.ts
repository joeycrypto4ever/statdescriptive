// src/hooks/useAnalysis.ts
'use client';

import { useAnalysisContext } from '@/context/AnalysisContext';
import { parseCSV, extractModalitiesWithEffectifs, isEffectifFormat } from '@/lib/parsers/csvParser';
import { detectVariables } from '@/lib/detection/variableDetector';
import { detectType } from '@/lib/detection/typeDetector';
import { isClassNotation, parseAllClasses, areClassesEqual } from '@/lib/parsers/classParser';
import { StatType, AnalysisResult } from '@/types/statistics';
import { COMPATIBLE_CHARTS } from '@/lib/utils/constants';

// Engine imports
import { calculsNominale } from '@/lib/engines/qualitative_nominale/calculs';
import { buildTableauNominale } from '@/lib/engines/qualitative_nominale/tableau';
import { interpretNominale } from '@/lib/engines/qualitative_nominale/interpretations';

import { calculsOrdinale } from '@/lib/engines/qualitative_ordinale/calculs';
import { buildTableauOrdinale } from '@/lib/engines/qualitative_ordinale/tableau';
import { interpretOrdinale } from '@/lib/engines/qualitative_ordinale/interpretations';

import { calculsCodage } from '@/lib/engines/codage/calculs';
import { buildTableauCodage } from '@/lib/engines/codage/tableau';
import { interpretCodage } from '@/lib/engines/codage/interpretations';

import { calculsDiscrete } from '@/lib/engines/quantitative_discrete/calculs';
import { buildTableauDiscrete } from '@/lib/engines/quantitative_discrete/tableau';
import { buildConcentration as buildConcentrationDiscrete } from '@/lib/engines/quantitative_discrete/concentration';
import { interpretDiscrete } from '@/lib/engines/quantitative_discrete/interpretations';

import { calculsEgales } from '@/lib/engines/continue_egales/calculs';
import { buildTableauEgales } from '@/lib/engines/continue_egales/tableau';
import { buildConcentrationEgales } from '@/lib/engines/continue_egales/concentration';
import { interpretEgales } from '@/lib/engines/continue_egales/interpretations';

import { calculsInegales } from '@/lib/engines/continue_inegales/calculs';
import { buildTableauInegales } from '@/lib/engines/continue_inegales/tableau';
import { buildConcentrationInegales } from '@/lib/engines/continue_inegales/concentration';
import { interpretInegales } from '@/lib/engines/continue_inegales/interpretations';

export function useAnalysis() {
  const { state, dispatch } = useAnalysisContext();

  const loadCsv = (text: string) => {
    try {
      dispatch({ type: 'SET_RAW_CSV', payload: text });
      const parsed = parseCSV(text);
      const variables = detectVariables(parsed);
      dispatch({ type: 'SET_PARSED_DATA', payload: { data: parsed, variables } });

      // If only one analyzable variable, auto-select
      const analyzable = variables.filter(v => v.isAnalyzable);
      if (analyzable.length === 1) {
        dispatch({ type: 'SELECT_VARIABLE', payload: analyzable[0].name });
      }
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (e as Error).message });
    }
  };

  const selectVariable = (name: string) => {
    dispatch({ type: 'SELECT_VARIABLE', payload: name });
  };

  const runAnalysis = (type: StatType | 'auto', ordinalOrder?: string[]) => {
    if (!state.parsedData || !state.selectedVariable) return;

    const variable = state.selectedVariable;
    const data = state.parsedData;
    const varInfo = state.variables.find(v => v.name === variable);
    if (!varInfo) return;

    try {
      const finalType: StatType = type === 'auto'
        ? detectType(data, variable, varInfo)
        : type;

      dispatch({ type: 'SET_DETECTED_TYPE', payload: finalType });

      let result: AnalysisResult;

      switch (finalType) {
        case 'qualitative_nominale':
          result = analyzeNominale(data, variable);
          break;
        case 'qualitative_ordinale':
          result = analyzeOrdinale(data, variable, ordinalOrder || []);
          break;
        case 'codage':
          result = analyzeCodage(data, variable, ordinalOrder || []);
          break;
        case 'quantitative_discrete':
          result = analyzeDiscrete(data, variable);
          break;
        case 'continue_egales':
          result = analyzeEgales(data, variable);
          break;
        case 'continue_inegales':
          result = analyzeInegales(data, variable);
          break;
        default:
          throw new Error('Type statistique non reconnu');
      }

      dispatch({ type: 'SET_RESULT', payload: result });
    } catch (e: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (e as Error).message });
    }
  };

  const reset = () => dispatch({ type: 'RESET' });

  return { state, dispatch, loadCsv, selectVariable, runAnalysis, reset };
}

// ─── Individual analyzers ───

function analyzeNominale(data: import('@/types/analysis').ParsedData, variable: string): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);
  const modalites = items.map(i => i.modalite);
  const effectifs = items.map(i => i.ni);
  const { rows, total } = buildTableauNominale(modalites, effectifs);
  const central = calculsNominale(modalites, effectifs);
  const interpretations = interpretNominale(rows, central, total);

  return {
    variable, type: 'qualitative_nominale', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion: null, forme: null, concentration: null, boxPlot: null,
    compatibleCharts: COMPATIBLE_CHARTS.qualitative_nominale,
    interpretations,
  };
}

function analyzeOrdinale(data: import('@/types/analysis').ParsedData, variable: string, ordinalOrder: string[]): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);
  const modalites = items.map(i => i.modalite);
  const effectifs = items.map(i => i.ni);
  const order = ordinalOrder.length > 0 ? ordinalOrder : modalites;
  const { rows, total } = buildTableauOrdinale(modalites, effectifs, order);
  const central = calculsOrdinale(modalites, effectifs, order);
  const interpretations = interpretOrdinale(rows, central, total);

  return {
    variable, type: 'qualitative_ordinale', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion: null, forme: null, concentration: null, boxPlot: null,
    compatibleCharts: COMPATIBLE_CHARTS.qualitative_ordinale,
    interpretations,
  };
}

function analyzeCodage(data: import('@/types/analysis').ParsedData, variable: string, ordinalOrder: string[]): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);
  const modalites = items.map(i => i.modalite);
  const effectifs = items.map(i => i.ni);
  const order = ordinalOrder.length > 0 ? ordinalOrder : modalites;
  const { rows, total, codageMap } = buildTableauCodage(modalites, effectifs, order);
  const { central, dispersion, forme } = calculsCodage(modalites, effectifs, order);

  // Concentration using coded values
  const values = order.filter(m => modalites.includes(m)).map(m => codageMap[m]);
  const orderedEff = order.filter(m => modalites.includes(m)).map(m => effectifs[modalites.indexOf(m)]);
  const concentration = buildConcentrationDiscrete(values, orderedEff);

  // Box plot
  const nicc: number[] = [];
  let cumul = 0;
  orderedEff.forEach(n => { cumul += n; nicc.push(cumul); });
  const { boxPlot } = calculsDiscrete(values, orderedEff);

  const interpretations = interpretCodage(rows, central, dispersion, forme, total, codageMap);

  return {
    variable, type: 'codage', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion, forme, concentration, boxPlot,
    compatibleCharts: COMPATIBLE_CHARTS.codage,
    interpretations,
  };
}

function analyzeDiscrete(data: import('@/types/analysis').ParsedData, variable: string): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);
  const values = items.map(i => Number(i.modalite.replace(',', '.'))).sort((a, b) => a - b);
  const effectifs = items.map(i => {
    const v = Number(i.modalite.replace(',', '.'));
    return i.ni;
  });

  // Sort by value
  const paired = items.map(i => ({
    value: Number(i.modalite.replace(',', '.')),
    ni: i.ni,
  })).sort((a, b) => a.value - b.value);

  const sortedValues = paired.map(p => p.value);
  const sortedEffectifs = paired.map(p => p.ni);

  const { rows, total } = buildTableauDiscrete(sortedValues, sortedEffectifs);
  const { central, dispersion, forme, boxPlot } = calculsDiscrete(sortedValues, sortedEffectifs);
  const concentration = buildConcentrationDiscrete(sortedValues, sortedEffectifs);
  const interpretations = interpretDiscrete(central, dispersion, forme, concentration, total);

  return {
    variable, type: 'quantitative_discrete', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion, forme, concentration, boxPlot,
    compatibleCharts: COMPATIBLE_CHARTS.quantitative_discrete,
    interpretations,
  };
}

function analyzeEgales(data: import('@/types/analysis').ParsedData, variable: string): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);

  // Check if class notation
  const firstVal = items[0]?.modalite;
  if (isClassNotation(firstVal)) {
    const classes = parseAllClasses(items.map(i => i.modalite));
    const classEffectifs = classes.map(c => {
      const item = items.find(i => i.modalite.includes(String(c.borneInf)));
      return item?.ni || 0;
    });

    const bornesInf = classes.map(c => c.borneInf);
    const bornesSup = classes.map(c => c.borneSup);
    const effectifs = classEffectifs;

    const { rows, total } = buildTableauEgales(bornesInf, bornesSup, effectifs);
    const { central, dispersion, forme, boxPlot } = calculsEgales(bornesInf, bornesSup, effectifs);
    const concentration = buildConcentrationEgales(bornesInf, bornesSup, effectifs);
    const interpretations = interpretEgales(central, dispersion, forme, concentration, total);

    return {
      variable, type: 'continue_egales', effectifTotal: total,
      tableau: rows, centralTendency: central,
      dispersion, forme, concentration, boxPlot,
      compatibleCharts: COMPATIBLE_CHARTS.continue_egales,
      interpretations,
    };
  }

  // Raw numeric → generate classes
  const { generateClasses } = require('@/lib/parsers/classParser');
  const numericValues = items.flatMap(i => {
    const v = Number(i.modalite.replace(',', '.'));
    return Array(i.ni).fill(v);
  });
  const classes = generateClasses(numericValues);
  const bornesInf = classes.map((c: { borneInf: number }) => c.borneInf);
  const bornesSup = classes.map((c: { borneSup: number }) => c.borneSup);
  const effectifs = classes.map((c: { borneInf: number; borneSup: number }) =>
    numericValues.filter(v => v >= c.borneInf && v < c.borneSup).length
  );

  const { rows, total } = buildTableauEgales(bornesInf, bornesSup, effectifs);
  const { central, dispersion, forme, boxPlot } = calculsEgales(bornesInf, bornesSup, effectifs);
  const concentration = buildConcentrationEgales(bornesInf, bornesSup, effectifs);
  const interpretations = interpretEgales(central, dispersion, forme, concentration, total);

  return {
    variable, type: 'continue_egales', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion, forme, concentration, boxPlot,
    compatibleCharts: COMPATIBLE_CHARTS.continue_egales,
    interpretations,
  };
}

function analyzeInegales(data: import('@/types/analysis').ParsedData, variable: string): AnalysisResult {
  const items = extractModalitiesWithEffectifs(data, variable);
  const classes = parseAllClasses(items.map(i => i.modalite));
  const classEffectifs = classes.map(c => {
    const item = items.find(i => i.modalite.includes(String(c.borneInf)));
    return item?.ni || 0;
  });

  const bornesInf = classes.map(c => c.borneInf);
  const bornesSup = classes.map(c => c.borneSup);

  const { rows, total } = buildTableauInegales(bornesInf, bornesSup, classEffectifs);
  const { central, dispersion, forme, boxPlot } = calculsInegales(bornesInf, bornesSup, classEffectifs);
  const concentration = buildConcentrationInegales(bornesInf, bornesSup, classEffectifs);
  const interpretations = interpretInegales(central, dispersion, forme, concentration, total);

  return {
    variable, type: 'continue_inegales', effectifTotal: total,
    tableau: rows, centralTendency: central,
    dispersion, forme, concentration, boxPlot,
    compatibleCharts: COMPATIBLE_CHARTS.continue_inegales,
    interpretations,
  };
}
