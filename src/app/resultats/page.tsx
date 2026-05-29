// src/app/resultats/page.tsx
'use client';

import Link from 'next/link';

export default function ResultatsPage() {
  return (
    <div className="page-container">
      <h1>Résultats</h1>
      <p>Les résultats s&apos;affichent directement dans la page d&apos;analyse après avoir cliqué sur « Analyser ».</p>
      <Link href="/analyse" className="btn btn-primary">Aller à l&apos;analyse</Link>
    </div>
  );
}