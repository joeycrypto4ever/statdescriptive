// src/app/pedagogie/graphiques-interactifs/page.tsx
'use client';

import GraphExplanation from '@/components/pedagogie/GraphExplanation';
import { GRAPHIQUES_CONTENT } from '@/data/pedagogie/graphiquesContent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GraphiquesInteractifsPage() {
  return (
    <div className="page-container pedagogie-page">
      <Link href="/" className="btn btn-ghost back-link"><ArrowLeft size={18} /> Retour</Link>
      <h1 className="pedagogie-title">📈 Graphiques Interactifs</h1>
      <p className="pedagogie-intro">
        Chaque type statistique a ses graphiques compatibles. Apprenez à lire et interpréter
        chaque graphique pour mieux comprendre vos données.
      </p>
      <nav className="pedagogie-nav">
        {GRAPHIQUES_CONTENT.map(g => (
          <a key={g.id} href={`#${g.id}`} className="pedagogie-nav-link">{g.titre}</a>
        ))}
      </nav>
      <div className="pedagogie-cards">
        {GRAPHIQUES_CONTENT.map(g => (
          <GraphExplanation key={g.id} data={g} />
        ))}
      </div>
    </div>
  );
}