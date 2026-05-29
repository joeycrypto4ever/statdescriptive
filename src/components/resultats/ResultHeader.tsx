// src/components/resultats/ResultHeader.tsx
'use client';

import { AnalysisResult } from '@/types/statistics';
import { TYPE_LABELS } from '@/lib/utils/constants';
import { FlaskConical, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ResultHeaderProps {
  result: AnalysisResult;
}

export default function ResultHeader({ result }: ResultHeaderProps) {
  return (
    <div className="result-header">
      <div className="result-header-top">
        <Link href="/analyse" className="btn btn-ghost">
          <ArrowLeft size={18} /> Retour
        </Link>
        <Link href="/analyse" className="btn btn-primary">
          <FlaskConical size={18} /> Nouvelle analyse
        </Link>
      </div>
      <div className="result-header-info">
        <h1 className="result-title">Résultats de l&apos;analyse</h1>
        <div className="result-meta">
          <div className="result-meta-item">
            <span className="result-meta-label">Variable</span>
            <span className="result-meta-value">{result.variable}</span>
          </div>
          <div className="result-meta-item">
            <span className="result-meta-label">Type détecté</span>
            <span className="result-meta-value result-type-badge">{TYPE_LABELS[result.type]}</span>
          </div>
          <div className="result-meta-item">
            <span className="result-meta-label">Effectif total</span>
            <span className="result-meta-value">n = {result.effectifTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
