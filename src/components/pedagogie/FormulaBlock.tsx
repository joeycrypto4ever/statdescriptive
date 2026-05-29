// src/components/pedagogie/FormulaBlock.tsx
'use client';

import { CalculPedagogique } from '@/data/pedagogie/calculsContent';

interface FormulaBlockProps {
  data: CalculPedagogique;
}

export default function FormulaBlock({ data }: FormulaBlockProps) {
  return (
    <div className="formula-block" id={data.id}>
      <h3 className="formula-title">{data.titre}</h3>

      <div className="formula-box">
        <strong>Formule :</strong>
        <p className="formula-text">{data.formule}</p>
      </div>

      <div className="formula-section">
        <h4>💡 Explication</h4>
        <p>{data.explication}</p>
      </div>

      <div className="formula-section">
        <h4>📋 Étapes de calcul</h4>
        <ol>{data.etapes.map((e, i) => <li key={i}>{e}</li>)}</ol>
      </div>

      <div className="formula-section">
        <h4>📖 Interprétation</h4>
        <p>{data.interpretation}</p>
      </div>

      <div className="formula-section">
        <h4>✅ Types compatibles</h4>
        <div className="formula-types">
          {data.typesCompatibles.map((t, i) => (
            <span key={i} className="formula-type-badge">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
