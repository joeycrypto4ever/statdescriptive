// src/lib/detection/variableDetector.ts

import { ParsedData, VariableInfo } from '@/types/analysis';
import { classifyColumn } from './columnClassifier';
import { isClassNotation } from '@/lib/parsers/classParser';
import { isEffectifFormat } from '@/lib/parsers/csvParser';

/** Detect all variables in parsed data and classify them */
export function detectVariables(data: ParsedData): VariableInfo[] {
  const variables: VariableInfo[] = [];

  // If effectif format (2 columns: Variable, Effectif), only first col is the variable
  if (data.headers.length === 2 && isEffectifFormat(data.headers)) {
    const header = data.headers[0];
    const values = data.rows.map(r => r[header]).filter(v => v !== undefined);
    const uniqueValues = [...new Set(values)];
    const isNumeric = values.every(v => !isNaN(Number(v.replace(',', '.'))));
    const isClass = values.some(v => isClassNotation(v));

    variables.push({
      name: header,
      isAnalyzable: true,
      isIdentifier: false,
      sampleValues: uniqueValues.slice(0, 5),
      uniqueCount: uniqueValues.length,
      totalCount: values.length,
      isNumeric,
      isClass,
    });
    return variables;
  }

  for (const header of data.headers) {
    const values = data.rows.map(r => r[header]).filter(v => v !== undefined && v.trim() !== '');
    const uniqueValues = [...new Set(values)];
    const colType = classifyColumn(values, header);
    const isNumeric = values.every(v => !isNaN(Number(v.replace(',', '.'))));
    const isClass = values.some(v => isClassNotation(v));

    variables.push({
      name: header,
      isAnalyzable: colType !== 'identifier',
      isIdentifier: colType === 'identifier',
      sampleValues: uniqueValues.slice(0, 5),
      uniqueCount: uniqueValues.length,
      totalCount: values.length,
      isNumeric,
      isClass,
    });
  }

  return variables;
}
