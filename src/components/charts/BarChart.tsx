// src/components/charts/BarChart.tsx
'use client';

import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FrequencyRow } from '@/types/statistics';

const COLORS = ['#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899','#f43f5e','#f97316','#eab308','#22c55e','#14b8a6'];

interface BarChartProps {
  rows: FrequencyRow[];
  title?: string;
}

export default function StatBarChart({ rows, title }: BarChartProps) {
  const data = rows.map(r => ({ name: r.modalite, ni: r.ni, fi: r.fiPercent }));

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={350}>
        <RechartsBar data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={12} />
          <YAxis label={{ value: 'Effectif (ni)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip formatter={(value: number) => [value, 'Effectif']} />
          <Bar dataKey="ni" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}
