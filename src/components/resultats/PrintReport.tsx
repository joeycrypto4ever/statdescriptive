// src/components/resultats/PrintReport.tsx
'use client';

import { AnalysisResult } from '@/types/statistics';
import { TYPE_LABELS } from '@/lib/utils/constants';

interface PrintReportProps {
  result: AnalysisResult;
}

export default function PrintReport({ result }: PrintReportProps) {
  return (
    <div id="print-report" style={{ display: 'none' }}>
      <h1>StatDescriptive — Rapport d&apos;analyse</h1>
      <hr />
      <h2>Informations générales</h2>
      <p><strong>Variable :</strong> {result.variable}</p>
      <p><strong>Type :</strong> {TYPE_LABELS[result.type]}</p>
      <p><strong>Effectif total :</strong> n = {result.effectifTotal}</p>
      <hr />
      <h2>Interprétations</h2>
      {Object.entries(result.interpretations).map(([key, value]) => (
        <div key={key} className="interpretation">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}
