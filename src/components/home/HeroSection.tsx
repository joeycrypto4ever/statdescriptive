// src/components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { Rocket, BarChart3, Calculator, LineChart, BookOpen } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-icon-row">
          <BarChart3 size={48} className="hero-main-icon" />
        </div>
        <h1 className="hero-title">StatDescriptive</h1>
        <p className="hero-subtitle">
          Plateforme académique d&apos;analyse statistique descriptive
        </p>
        <p className="hero-description">
          Analysez vos données en toute simplicité grâce à une application conçue pour les étudiants.
          Tableaux statistiques complets, indicateurs détaillés, graphiques interactifs et interprétations
          automatiques basées sur les méthodes universitaires.
        </p>
        <div className="hero-features">
          <div className="hero-feature">
            <Calculator size={20} />
            <span>Calculs statistiques</span>
          </div>
          <div className="hero-feature">
            <LineChart size={20} />
            <span>Graphiques interactifs</span>
          </div>
          <div className="hero-feature">
            <BookOpen size={20} />
            <span>Interprétations académiques</span>
          </div>
        </div>
        <Link href="/analyse" className="btn btn-primary btn-lg hero-cta">
          <Rocket size={22} />
          Commencer une analyse
        </Link>
      </div>
    </section>
  );
}
