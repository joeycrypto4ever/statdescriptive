// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/shared/Navbar';

export const metadata: Metadata = {
  title: 'StatDescriptive — Analyse Statistique Descriptive',
  description: 'Plateforme académique complète pour l\'analyse statistique descriptive avancée.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
















