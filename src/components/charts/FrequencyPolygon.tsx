// src/components/charts/FrequencyPolygon.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClassRow } from '@/types/statistics';

interface FrequencyPolygonProps {
  rows: ClassRow[];
  title?: string;
}

export default function FrequencyPolygon({ rows, title }: FrequencyPolygonProps) {
  const data = rows.map(r => ({
    ci: r.ci,
    ni: r.ni,
    nic: r.nic || r.ni,
  }));

  const hasNic = rows.some(r => r.nic !== undefined && r.nic !== r.ni);

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="ci" label={{ value: 'Centre de classe (ci)', position: 'bottom', style: { fontSize: 12 } }} />
          <YAxis label={{ value: hasNic ? 'Effectif corrigé (nic)' : 'Effectif (ni)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip />
          <Line type="linear" dataKey={hasNic ? 'nic' : 'ni'} stroke="#6366f1" strokeWidth={2} dot={{ r: 5, fill: '#6366f1' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
