// src/components/home/PedagogicButtons.tsx
'use client';

import Link from 'next/link';
import { Layers, Calculator, BarChart3 } from 'lucide-react';

const buttons = [
  {
    href: '/pedagogie/types-statistiques',
    icon: Layers,
    title: 'Tous les Types Statistiques',
    description: 'Découvrez les 6 types de variables : nominale, ordinale, codage, discrète, continue égales et inégales. Définitions, exemples, indicateurs et graphiques compatibles.',
    color: '#6366f1',
  },
  {
    href: '/pedagogie/calculs-detailles',
    icon: Calculator,
    title: 'Calculs Détaillés',
    description: 'Moyenne, médiane, mode, variance, écart-type, quartiles, déciles, CV, asymétrie, aplatissement, indice de Gini... Formules, étapes et interprétations.',
    color: '#8b5cf6',
  },
  {
    href: '/pedagogie/graphiques-interactifs',
    icon: BarChart3,
    title: 'Graphiques Interactifs',
    description: 'Barres, circulaire, histogramme, polygone, cumulative, boîte à moustaches, courbe de Lorenz. Définitions, utilités et interprétations.',
    color: '#a855f7',
  },
];

export default function PedagogicButtons() {
  return (
    <section className="pedagogic-buttons">
      <h2 className="section-title">📚 Comprendre la statistique avant d&apos;analyser</h2>
      <div className="pedagogic-grid">
        {buttons.map(b => (
          <Link key={b.href} href={b.href} className="pedagogic-card" style={{ '--card-accent': b.color } as React.CSSProperties}>
            <div className="pedagogic-card-icon" style={{ background: b.color }}>
              <b.icon size={32} color="white" />
            </div>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
            <span className="pedagogic-card-link">Explorer →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
