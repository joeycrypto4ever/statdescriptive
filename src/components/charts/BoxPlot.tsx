// src/components/charts/BoxPlot.tsx
'use client';

import { BoxPlotData } from '@/types/statistics';
import { formatNumber } from '@/lib/utils/formatting';

interface BoxPlotProps {
  data: BoxPlotData;
  title?: string;
}

export default function BoxPlot({ data, title }: BoxPlotProps) {
  const { min, max, Q1, mediane, Q3, IQ, moustacheBas, moustacheHaut, valeursAberrantes } = data;

  const padding = 40;
  const width = 600;
  const height = 200;
  const range = moustacheHaut - moustacheBas;
  const fullRange = max - min;
  const displayMin = min - fullRange * 0.1;
  const displayMax = max + fullRange * 0.1;
  const displayRange = displayMax - displayMin;

  const scale = (v: number) => padding + ((v - displayMin) / displayRange) * (width - 2 * padding);

  const boxTop = 60;
  const boxHeight = 60;
  const boxMid = boxTop + boxHeight / 2;

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <svg viewBox={`0 0 ${width} ${height + 40}`} className="boxplot-svg">
        {/* Whisker left */}
        <line x1={scale(moustacheBas)} y1={boxMid} x2={scale(Q1)} y2={boxMid} stroke="#6366f1" strokeWidth={2} />
        <line x1={scale(moustacheBas)} y1={boxTop + 15} x2={scale(moustacheBas)} y2={boxTop + boxHeight - 15} stroke="#6366f1" strokeWidth={2} />

        {/* Whisker right */}
        <line x1={scale(Q3)} y1={boxMid} x2={scale(moustacheHaut)} y2={boxMid} stroke="#6366f1" strokeWidth={2} />
        <line x1={scale(moustacheHaut)} y1={boxTop + 15} x2={scale(moustacheHaut)} y2={boxTop + boxHeight - 15} stroke="#6366f1" strokeWidth={2} />

        {/* Box */}
        <rect x={scale(Q1)} y={boxTop} width={scale(Q3) - scale(Q1)} height={boxHeight} fill="#e0e7ff" stroke="#6366f1" strokeWidth={2} rx={4} />

        {/* Median line */}
        <line x1={scale(mediane)} y1={boxTop} x2={scale(mediane)} y2={boxTop + boxHeight} stroke="#ef4444" strokeWidth={3} />

        {/* Outliers */}
        {valeursAberrantes.map((v, i) => (
          <circle key={i} cx={scale(v)} cy={boxMid} r={5} fill="#ef4444" stroke="#fff" strokeWidth={1} />
        ))}

        {/* Labels */}
        <text x={scale(moustacheBas)} y={boxTop - 8} textAnchor="middle" fontSize={10} fill="#64748b">{formatNumber(moustacheBas)}</text>
        <text x={scale(Q1)} y={boxTop + boxHeight + 18} textAnchor="middle" fontSize={10} fill="#6366f1">Q1={formatNumber(Q1)}</text>
        <text x={scale(mediane)} y={boxTop - 8} textAnchor="middle" fontSize={11} fill="#ef4444" fontWeight="bold">Me={formatNumber(mediane)}</text>
        <text x={scale(Q3)} y={boxTop + boxHeight + 18} textAnchor="middle" fontSize={10} fill="#6366f1">Q3={formatNumber(Q3)}</text>
        <text x={scale(moustacheHaut)} y={boxTop - 8} textAnchor="middle" fontSize={10} fill="#64748b">{formatNumber(moustacheHaut)}</text>

        {/* IQ label */}
        <line x1={scale(Q1)} y1={boxTop + boxHeight + 28} x2={scale(Q3)} y2={boxTop + boxHeight + 28} stroke="#8b5cf6" strokeWidth={1} markerEnd="url(#arr)" markerStart="url(#arr)" />
        <text x={(scale(Q1) + scale(Q3)) / 2} y={boxTop + boxHeight + 40} textAnchor="middle" fontSize={10} fill="#8b5cf6">IQ={formatNumber(IQ)}</text>
      </svg>
      <div className="boxplot-legend">
        <span>Min={formatNumber(min)}</span>
        <span>Moust. gauche={formatNumber(moustacheBas)}</span>
        <span>Q1={formatNumber(Q1)}</span>
        <span className="boxplot-med">Me={formatNumber(mediane)}</span>
        <span>Q3={formatNumber(Q3)}</span>
        <span>Moust. droite={formatNumber(moustacheHaut)}</span>
        <span>Max={formatNumber(max)}</span>
        {valeursAberrantes.length > 0 && <span className="boxplot-outlier">Aberrantes: {valeursAberrantes.map(v => formatNumber(v)).join(', ')}</span>}
      </div>
    </div>
  );
}
