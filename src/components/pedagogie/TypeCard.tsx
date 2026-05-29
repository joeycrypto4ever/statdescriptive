// src/components/pedagogie/TypeCard.tsx
'use client';

import { TypePedagogique } from '@/data/pedagogie/typesContent';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface TypeCardProps {
  data: TypePedagogique;
}

export default function TypeCard({ data }: TypeCardProps) {
  return (
    <div className="type-pedagogy-card" id={data.id}>
      <h3 className="type-pedagogy-title">{data.titre}</h3>
      <div className="type-pedagogy-def">
        <strong>Définition :</strong> {data.definition}
      </div>

      <div className="type-pedagogy-section">
        <h4>📌 Caractéristiques</h4>
        <ul>{data.caracteristiques.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>

      <div className="type-pedagogy-section">
        <h4>📝 Exemples</h4>
        <ul>{data.exemples.map((e, i) => <li key={i}>{e}</li>)}</ul>
      </div>

      <div className="type-pedagogy-section">
        <h4>📊 Données compatibles</h4>
        <ul>{data.donneesCompatibles.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>

      <div className="type-pedagogy-columns">
        <div>
          <h4><CheckCircle size={16} /> Indicateurs compatibles</h4>
          <ul>{data.indicateursCompatibles.map((ind, i) => <li key={i} className="compat-yes">{ind}</li>)}</ul>
        </div>
        <div>
          <h4><CheckCircle size={16} /> Graphiques compatibles</h4>
          <ul>{data.graphiquesCompatibles.map((g, i) => <li key={i} className="compat-yes">{g}</li>)}</ul>
        </div>
      </div>

      <div className="type-pedagogy-section type-pedagogy-errors">
        <h4><AlertTriangle size={16} /> Erreurs fréquentes</h4>
        <ul>{data.erreurs.map((e, i) => <li key={i} className="compat-no"><XCircle size={14} /> {e}</li>)}</ul>
      </div>
    </div>
  );
}
