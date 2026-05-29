// src/app/pedagogie/types-statistiques/page.tsx
'use client';

import TypeCard from '@/components/pedagogie/TypeCard';
import { TYPES_CONTENT } from '@/data/pedagogie/typesContent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TypesStatistiquesPage() {
  return (
    <div className="page-container pedagogie-page">
      <Link href="/" className="btn btn-ghost back-link"><ArrowLeft size={18} /> Retour</Link>
      <h1 className="pedagogie-title">📚 Tous les Types Statistiques</h1>
      <p className="pedagogie-intro">
        Comprendre le type de votre variable est la première étape essentielle de toute analyse statistique.
        Chaque type détermine les indicateurs applicables, les graphiques compatibles et les interprétations valides.
      </p>
      <nav className="pedagogie-nav">
        {TYPES_CONTENT.map(t => (
          <a key={t.id} href={`#${t.id}`} className="pedagogie-nav-link">{t.titre}</a>
        ))}
      </nav>
      <div className="pedagogie-cards">
        {TYPES_CONTENT.map(t => (
          <TypeCard key={t.id} data={t} />
        ))}
      </div>
    </div>
  );
}