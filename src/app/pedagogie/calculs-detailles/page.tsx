// src/app/pedagogie/calculs-detailles/page.tsx
'use client';

import FormulaBlock from '@/components/pedagogie/FormulaBlock';
import { CALCULS_CONTENT } from '@/data/pedagogie/calculsContent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CalculsDetaillesPage() {
  return (
    <div className="page-container pedagogie-page">
      <Link href="/" className="btn btn-ghost back-link"><ArrowLeft size={18} /> Retour</Link>
      <h1 className="pedagogie-title">🧮 Calculs Détaillés</h1>
      <p className="pedagogie-intro">
        Toutes les formules statistiques, leurs étapes de calcul et leurs interprétations.
        Basé sur les méthodes universitaires du cours de Statistique Descriptive.
      </p>
      <nav className="pedagogie-nav">
        {CALCULS_CONTENT.map(c => (
          <a key={c.id} href={`#${c.id}`} className="pedagogie-nav-link">{c.titre}</a>
        ))}
      </nav>
      <div className="pedagogie-cards">
        {CALCULS_CONTENT.map(c => (
          <FormulaBlock key={c.id} data={c} />
        ))}
      </div>
    </div>
  );
}
