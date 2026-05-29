// src/components/home/GuideSection.tsx
'use client';

import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

export default function GuideSection() {
  return (
    <section className="guide-section">
      <h2 className="section-title">📋 Guide d&apos;utilisation</h2>
      <div className="guide-grid">
        <div className="guide-card">
          <div className="guide-card-header">
            <FileText size={24} />
            <h3>Formats acceptés</h3>
          </div>
          <div className="guide-card-body">
            <h4>Saisie directe</h4>
            <p>Format CSV uniquement pour la saisie dans la zone de texte.</p>
            <h4>Importation de fichiers</h4>
            <ul>
              <li><strong>CSV</strong> — fichier texte séparé par des virgules ou points-virgules</li>
              <li><strong>TXT</strong> — fichier texte tabulé</li>
              <li><strong>Excel</strong> — fichiers .xlsx ou .xls</li>
            </ul>
          </div>
        </div>

        <div className="guide-card guide-card-warning">
          <div className="guide-card-header">
            <AlertTriangle size={24} />
            <h3>Règles importantes</h3>
          </div>
          <div className="guide-card-body">
            <ul>
              <li><AlertTriangle size={14} /> <strong>Classes inégales</strong> → utiliser obligatoirement les densités di = ni/ai</li>
              <li><AlertTriangle size={14} /> <strong>Variables ordinales</strong> → codage numérique obligatoire pour obtenir tous les indicateurs</li>
              <li><AlertTriangle size={14} /> <strong>Les noms de personnes</strong> ne doivent jamais être analysés statistiquement</li>
              <li><CheckCircle size={14} /> Vérifier la cohérence entre le type choisi et les données</li>
              <li><CheckCircle size={14} /> Les classes doivent être ordonnées correctement</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
