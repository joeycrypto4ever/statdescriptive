// src/components/charts/Histogram.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ClassRow } from '@/types/statistics';

interface HistogramProps {
  rows: ClassRow[];
  usesDensity: boolean;
  title?: string;
}

export default function Histogram({ rows, usesDensity, title }: HistogramProps) {
  const data = rows.map(r => ({
    name: r.classe,
    value: usesDensity ? (r.di || 0) : r.ni,
    ci: r.ci,
  }));

  const yLabel = usesDensity ? 'Densité (di)' : 'Effectif (ni)';

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      {usesDensity && (
        <p className="chart-warning">
          ⚠ Classes d&apos;amplitudes inégales : la hauteur des barres est la densité di = ni/ai
          (et NON ni) pour que les surfaces soient proportionnelles aux fréquences.
        </p>
      )}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barGap={0} barCategoryGap={0}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={11} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip formatter={(value: number) => [value.toFixed(2), yLabel]} />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill="#6366f1" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
