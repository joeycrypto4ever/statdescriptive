// src/components/charts/CumulativeCurve.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FrequencyRow, ClassRow } from '@/types/statistics';

interface CumulativeCurveProps {
  rows: (FrequencyRow | ClassRow)[];
  mediane?: number | null;
  Q1?: number | null;
  Q3?: number | null;
  title?: string;
}

export default function CumulativeCurve({ rows, mediane, Q1, Q3, title }: CumulativeCurveProps) {
  const isClass = 'borneInf' in (rows[0] || {});

  const data = rows.map(r => {
    if (isClass) {
      const cr = r as ClassRow;
      return { x: cr.borneSup, Ficc: cr.Ficc, label: cr.classe };
    } else {
      const fr = r as FrequencyRow;
      return { x: fr.xi ?? 0, Ficc: fr.Ficc ?? 0, label: fr.modalite };
    }
  });

  // Add starting point for classes
  if (isClass && data.length > 0) {
    const firstRow = rows[0] as ClassRow;
    data.unshift({ x: firstRow.borneInf, Ficc: 0, label: '' });
  }

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="x" label={{ value: isClass ? 'Borne supérieure' : 'xi', position: 'bottom', style: { fontSize: 12 } }} />
          <YAxis domain={[0, 1]} label={{ value: 'Ficc', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip formatter={(value) => [Number(value).toFixed(4), 'Ficc']} />
          <ReferenceLine y={0.5} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Me (0,5)', fill: '#ef4444', fontSize: 11 }} />
          {Q1 !== null && Q1 !== undefined && (
            <ReferenceLine y={0.25} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'Q1', fill: '#f97316', fontSize: 10 }} />
          )}
          {Q3 !== null && Q3 !== undefined && (
            <ReferenceLine y={0.75} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'Q3', fill: '#f97316', fontSize: 10 }} />
          )}
          <Line type="linear" dataKey="Ficc" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
