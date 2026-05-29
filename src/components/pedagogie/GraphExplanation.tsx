// src/components/pedagogie/GraphExplanation.tsx
'use client';

import { GraphPedagogique } from '@/data/pedagogie/graphiquesContent';

interface GraphExplanationProps {
  data: GraphPedagogique;
}

export default function GraphExplanation({ data }: GraphExplanationProps) {
  return (
    <div className="graph-explanation" id={data.id}>
      <h3 className="graph-title">{data.titre}</h3>

      <div className="graph-section">
        <strong>Définition :</strong> {data.definition}
      </div>

      <div className="graph-section">
        <h4>🎯 Utilité</h4>
        <p>{data.utilite}</p>
      </div>

      <div className="graph-section">
        <h4>📊 Types compatibles</h4>
        <div className="formula-types">
          {data.typesCompatibles.map((t, i) => (
            <span key={i} className="formula-type-badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="graph-section">
        <h4>📖 Interprétation</h4>
        <p>{data.interpretation}</p>
      </div>

      {data.details && (
        <div className="graph-section graph-details">
          <h4>📐 Détails techniques</h4>
          <ul>{data.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
