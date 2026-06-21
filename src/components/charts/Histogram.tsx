// src/components/charts/Histogram.tsx
'use client';

import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ClassRow } from '@/types/statistics';

interface HistogramProps {
  rows: ClassRow[];
  usesDensity: boolean;
  title?: string;
}

/* ── Classes inégales : largeur de barre ∝ amplitude, hauteur = densité ── */
function VariableWidthHistogram({ rows }: { rows: ClassRow[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);

  const W = 720, H = 380;
  const m = { top: 20, right: 24, bottom: 56, left: 64 };
  const innerW = W - m.left - m.right;
  const innerH = H - m.top - m.bottom;

  const xMin = rows[0].borneInf;
  const xMax = rows[rows.length - 1].borneSup;
  const yMax = (Math.max(...rows.map(r => r.di || 0)) || 1) * 1.1;

  const sx = (v: number) => m.left + ((v - xMin) / (xMax - xMin)) * innerW;
  const sy = (v: number) => m.top + innerH - (v / yMax) * innerH;

  const yTickVals = Array.from({ length: 6 }, (_, i) => (yMax / 5) * i);
  const xBounds = [...rows.map(r => r.borneInf), xMax];

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        {yTickVals.map((v, i) => (
          <g key={`y${i}`}>
            <line x1={m.left} y1={sy(v)} x2={W - m.right} y2={sy(v)} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x={m.left - 8} y={sy(v) + 4} textAnchor="end" fontSize="11" fill="#64748b">{v.toFixed(2)}</text>
          </g>
        ))}

        <line x1={m.left} y1={m.top} x2={m.left} y2={m.top + innerH} stroke="#94a3b8" />
        <line x1={m.left} y1={m.top + innerH} x2={W - m.right} y2={m.top + innerH} stroke="#94a3b8" />

        {rows.map((r, i) => {
          const x = sx(r.borneInf);
          const w = sx(r.borneSup) - sx(r.borneInf);
          const y = sy(r.di || 0);
          const h = m.top + innerH - y;
          const active = hover?.i === i;
          return (
            <rect
              key={`bar${i}`}
              x={x} y={y} width={w} height={h}
              fill={active ? '#4f46e5' : '#6366f1'}
              stroke="#ffffff" strokeWidth={1}
              onMouseMove={e => {
                const rect = wrapRef.current?.getBoundingClientRect();
                if (rect) setHover({ i, x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}

        {xBounds.map((b, i) => (
          <g key={`x${i}`}>
            <line x1={sx(b)} y1={m.top + innerH} x2={sx(b)} y2={m.top + innerH + 5} stroke="#94a3b8" />
            <text x={sx(b)} y={m.top + innerH + 18} textAnchor="middle" fontSize="10" fill="#64748b">{b}</text>
          </g>
        ))}

        <text x={16} y={m.top + innerH / 2} textAnchor="middle" fontSize="12" fill="#475569"
              transform={`rotate(-90 16 ${m.top + innerH / 2})`}>Densité (di = ni/ai)</text>
      </svg>

      {hover && (
        <div style={{
          position: 'absolute', left: hover.x + 12, top: hover.y - 10, pointerEvents: 'none',
          background: '#1e293b', color: '#fff', padding: '8px 10px', borderRadius: 6,
          fontSize: 12, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,.2)', zIndex: 10,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{rows[hover.i].classe}</div>
          <div>Densité di : {(rows[hover.i].di || 0).toFixed(3)}</div>
          <div>Effectif ni : {rows[hover.i].ni}</div>
          <div>Amplitude ai : {rows[hover.i].ai}</div>
        </div>
      )}
    </div>
  );
}

/* ── Classes égales : histogramme Recharts classique (hauteur = ni) ── */
function EqualWidthHistogram({ rows }: { rows: ClassRow[] }) {
  const data = rows.map(r => ({ name: r.classe, value: r.ni, ci: r.ci }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barGap={0} barCategoryGap={0}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" angle={-30} textAnchor="end" fontSize={11} />
        <YAxis label={{ value: 'Effectif (ni)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
        <Tooltip formatter={(value) => [Number(value).toFixed(2), 'Effectif (ni)']} />
        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
          {data.map((_, i) => (<Cell key={i} fill="#6366f1" />))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Histogram({ rows, usesDensity, title }: HistogramProps) {
  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      {usesDensity && (
        <p className="chart-warning">
          ⚠ Classes d&apos;amplitudes inégales : largeur de barre ∝ amplitude (ai), hauteur = densité
          di = ni/ai. La surface de chaque barre = di × ai = ni (fréquence).
        </p>
      )}
      {usesDensity
        ? <VariableWidthHistogram rows={rows} />
        : <EqualWidthHistogram rows={rows} />}
    </div>
  );
}
