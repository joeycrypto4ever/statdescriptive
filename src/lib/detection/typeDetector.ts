// src/lib/detection/typeDetector.ts

import { StatType } from '@/types/statistics';
import { ParsedData, VariableInfo } from '@/types/analysis';
import { isClassNotation, parseAllClasses, areClassesEqual } from '@/lib/parsers/classParser';
import { ORDINAL_SCALES } from '@/lib/utils/constants';
import { isEffectifFormat } from '@/lib/parsers/csvParser';

/** Auto-detect the statistical type of a variable */
export function detectType(data: ParsedData, variable: string, variableInfo: VariableInfo): StatType {
  const values = data.rows.map(r => r[variable]).filter(v => v !== undefined && v.trim() !== '');

  // 1. Check if class notation [a;b[
  if (values.some(v => isClassNotation(v))) {
    const classes = parseAllClasses(values);
    if (classes.length > 0) {
      return areClassesEqual(classes) ? 'continue_egales' : 'continue_inegales';
    }
  }

  // 2. Check for effectif format with classes
  if (data.headers.length === 2 && isEffectifFormat(data.headers)) {
    const modalites = data.rows.map(r => r[variable]);
    if (modalites.some(v => isClassNotation(v))) {
      const classes = parseAllClasses(modalites);
      return areClassesEqual(classes) ? 'continue_egales' : 'continue_inegales';
    }
  }

  // 3. Check if all values are numeric
  const numericValues = values.map(v => Number(v.replace(',', '.')));
  const allNumeric = numericValues.every(v => !isNaN(v));

  if (allNumeric) {
    // Check if discrete: all integers and few unique values
    const allIntegers = numericValues.every(v => Number.isInteger(v));
    const uniqueCount = new Set(numericValues).size;

    if (allIntegers && uniqueCount <= 20) {
      return 'quantitative_discrete';
    }

    // Many unique values with decimals → generate classes
    if (uniqueCount > 15) {
      return 'continue_egales'; // will generate classes
    }

    return 'quantitative_discrete';
  }

  // 4. Check if ordinal
  const lowerValues = values.map(v => v.toLowerCase().trim());
  const uniqueLower = [...new Set(lowerValues)];

  for (const scale of Object.values(ORDINAL_SCALES)) {
    const scaleLower = scale.map(s => s.toLowerCase());
    const matchCount = uniqueLower.filter(v => scaleLower.includes(v)).length;
    if (matchCount >= 2 && matchCount / uniqueLower.length >= 0.5) {
      return 'qualitative_ordinale';
    }
  }

  // 5. Check for common ordinal keywords
  const ordinalKeywords = ['nul', 'médiocre', 'moyen', 'bien', 'excellent', 'bon', 'mauvais',
    'faible', 'fort', 'satisfait', 'insatisfait', 'neutre', 'passable',
    'très', 'assez', 'peu', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
  const hasOrdinal = uniqueLower.some(v =>
    ordinalKeywords.some(k => v.includes(k))
  );
  if (hasOrdinal && uniqueLower.length <= 10) {
    return 'qualitative_ordinale';
  }

  // 6. Default: nominale
  return 'qualitative_nominale';
}
