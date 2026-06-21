// src/components/charts/PieChart.tsx
'use client';

import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FrequencyRow } from '@/types/statistics';

const COLORS = ['#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899','#f43f5e','#f97316','#eab308','#22c55e','#14b8a6'];

interface PieChartProps {
  rows: FrequencyRow[];
  title?: string;
}

export default function StatPieChart({ rows, title }: PieChartProps) {
  const data = rows.map(r => ({
    name: r.modalite,
    value: r.ni,
    angle: r.angleDeg || r.fiPercent,
  }));

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={380}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%" cy="50%"
            outerRadius={130}
            dataKey="value"
            label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`}
            labelLine={true}
            fontSize={11}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}
