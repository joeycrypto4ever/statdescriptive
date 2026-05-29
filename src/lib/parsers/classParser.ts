// src/lib/parsers/classParser.ts

export interface ParsedClass {
  borneInf: number;
  borneSup: number;
  label: string;
}

/** Check if a string is a class interval like [10;20[ or [10,20[ */
export function isClassNotation(value: string): boolean {
  return /^\[[\d.,\s]+[;:][\d.,\s]+\[$/.test(value.trim());
}

/** Parse a class interval string */
export function parseClass(value: string): ParsedClass | null {
  const cleaned = value.trim();
  const match = cleaned.match(/^\[([\d.,\s]+)[;:]([\d.,\s]+)\[$/);
  if (!match) return null;

  const borneInf = parseFloat(match[1].replace(',', '.').trim());
  const borneSup = parseFloat(match[2].replace(',', '.').trim());

  if (isNaN(borneInf) || isNaN(borneSup)) return null;

  return { borneInf, borneSup, label: cleaned };
}

/** Parse all classes from a list of strings */
export function parseAllClasses(values: string[]): ParsedClass[] {
  const classes: ParsedClass[] = [];
  for (const v of values) {
    const parsed = parseClass(v);
    if (parsed) classes.push(parsed);
  }
  return classes.sort((a, b) => a.borneInf - b.borneInf);
}

/** Check if all classes have equal amplitude */
export function areClassesEqual(classes: ParsedClass[]): boolean {
  if (classes.length <= 1) return true;
  const firstAmplitude = classes[0].borneSup - classes[0].borneInf;
  return classes.every(c => Math.abs((c.borneSup - c.borneInf) - firstAmplitude) < 0.001);
}

/** Generate classes from raw numeric data using Sturges formula */
export function generateClasses(values: number[]): ParsedClass[] {
  const n = values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const k = Math.ceil(1 + (10 / 3) * Math.log10(n)); // Sturges
  const amplitude = Math.ceil((max - min) / k);
  const start = Math.floor(min);

  const classes: ParsedClass[] = [];
  for (let i = 0; i < k; i++) {
    const borneInf = start + i * amplitude;
    const borneSup = start + (i + 1) * amplitude;
    classes.push({
      borneInf,
      borneSup,
      label: `[${borneInf};${borneSup}[`,
    });
  }
  return classes;
}
