// src/hooks/useExport.ts
'use client';

import { AnalysisResult, FrequencyRow, ClassRow } from '@/types/statistics';
import { downloadFile, arrayToCSV, printElement } from '@/lib/utils/export';

export function useExport() {

  const exportTableCSV = (result: AnalysisResult) => {
    const data = result.tableau.map(row => {
      const r: Record<string, unknown> = {};
      Object.entries(row).forEach(([k, v]) => { r[k] = v; });
      return r;
    });
    const csv = arrayToCSV(data);
    downloadFile(csv, `tableau_${result.variable}_${result.type}.csv`);
  };

  const exportConcentrationCSV = (result: AnalysisResult) => {
    if (!result.concentration) return;
    const data = result.concentration.tableau.map(row => {
      const r: Record<string, unknown> = {};
      Object.entries(row).forEach(([k, v]) => { r[k] = v; });
      return r;
    });
    const csv = arrayToCSV(data);
    downloadFile(csv, `concentration_${result.variable}.csv`);
  };

  const printReport = () => {
    printElement('print-report');
  };

  return { exportTableCSV, exportConcentrationCSV, printReport };
}
