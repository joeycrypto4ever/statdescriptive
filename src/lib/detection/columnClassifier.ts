// src/lib/detection/columnClassifier.ts

import { isClassNotation } from '@/lib/parsers/classParser';

export type ColumnType = 'identifier' | 'numeric' | 'class' | 'qualitative';

/** Classify a column based on its values */
export function classifyColumn(values: string[], header: string): ColumnType {
  if (values.length === 0) return 'qualitative';

  const nonEmpty = values.filter(v => v.trim() !== '');
  if (nonEmpty.length === 0) return 'qualitative';

  // Check if identifier (names, IDs) — high uniqueness ratio
  const uniqueValues = new Set(nonEmpty);
  const uniqueRatio = uniqueValues.size / nonEmpty.length;
  const headerLower = header.toLowerCase();

  const idKeywords = ['nom', 'name', 'prenom', 'id', 'identifiant', 'etudiant', 'eleve',
    'client', 'employe', 'personne', 'famille', 'patient', 'code'];
  const isIdHeader = idKeywords.some(k => headerLower.includes(k));

  if (isIdHeader && uniqueRatio > 0.8) return 'identifier';
  if (uniqueRatio > 0.9 && nonEmpty.length > 5 && !nonEmpty.every(v => !isNaN(Number(v)))) return 'identifier';

  // Check if class notation [a;b[
  if (nonEmpty.some(v => isClassNotation(v))) return 'class';

  // Check if numeric
  const numericCount = nonEmpty.filter(v => !isNaN(Number(v.replace(',', '.')))).length;
  if (numericCount / nonEmpty.length > 0.8) return 'numeric';

  return 'qualitative';
}
