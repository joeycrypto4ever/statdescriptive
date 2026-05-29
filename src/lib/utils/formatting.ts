// src/lib/utils/formatting.ts

/** Format number with French locale */
export function formatNumber(n: number, decimals: number = 2): string {
  return n.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format percentage */
export function formatPercent(n: number, decimals: number = 2): string {
  return formatNumber(n * 100, decimals) + ' %';
}

/** Format a class interval */
export function formatClass(borneInf: number, borneSup: number): string {
  return `[${formatNumber(borneInf, 0)};${formatNumber(borneSup, 0)}[`;
}

/** Truncate text */
export function truncate(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/** Generate unique ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/** Format timestamp to readable date */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
