// src/components/charts/LorenzCurve.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Concentration } from '@/types/statistics';
import { formatNumber } from '@/lib/utils/formatting';

interface LorenzCurveProps {
  concentration: Concentration;
  title?: string;
}

export default function LorenzCurve({ concentration, title }: LorenzCurveProps) {
  const { lorenzPoints, indiceGini } = concentration;

  // Build diagonal + lorenz data
  const data = lorenzPoints.map(p => ({
    Fi: Number(p.Fi.toFixed(4)),
    Gi: Number(p.Gi.toFixed(4)),
    egalite: Number(p.Fi.toFixed(4)),
  }));

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <div className="lorenz-gini-badge">
        Indice de Gini : <strong>{formatNumber(indiceGini, 4)}</strong>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="Fi"
            type="number"
            domain={[0, 1]}
            label={{ value: 'Fi (fréquences cumulées)', position: 'bottom', style: { fontSize: 12 } }}
          />
          <YAxis
            domain={[0, 1]}
            label={{ value: 'Gi (masses cumulées)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              value.toFixed(4),
              name === 'egalite' ? 'Diagonale d\'égalité' : 'Courbe de Lorenz',
            ]}
          />
          {/* Diagonal of equality */}
          <Line type="linear" dataKey="egalite" stroke="#94a3b8" strokeDasharray="8 4" strokeWidth={1.5} dot={false} name="Diagonale" />
          {/* Lorenz curve */}
          <Line type="linear" dataKey="Gi" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} name="Lorenz" />
        </LineChart>
      </ResponsiveContainer>
      <div className="lorenz-explanation">
        <p>📐 La <strong>diagonale d&apos;égalité</strong> (ligne pointillée) représente une répartition parfaitement égalitaire.</p>
        <p>📈 La <strong>courbe de Lorenz</strong> montre la répartition réelle. Plus elle s&apos;éloigne de la diagonale, plus la concentration est forte.</p>
        <p>📊 L&apos;<strong>indice de Gini</strong> (IG = {formatNumber(indiceGini, 4)}) mesure l&apos;aire entre les deux courbes. IG = 0 → égalité parfaite. IG → 1 → concentration maximale.</p>
      </div>
    </div>
  );
}
