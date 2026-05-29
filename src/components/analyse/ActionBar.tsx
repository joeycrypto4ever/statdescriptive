// src/components/analyse/ActionBar.tsx
'use client';

import { FlaskConical, RotateCcw, Clock } from 'lucide-react';

interface ActionBarProps {
  onAnalyze: () => void;
  onReset: () => void;
  onHistory: () => void;
  canAnalyze: boolean;
}

export default function ActionBar({ onAnalyze, onReset, onHistory, canAnalyze }: ActionBarProps) {
  return (
    <div className="action-bar">
      <button className="btn btn-primary" onClick={onAnalyze} disabled={!canAnalyze}>
        <FlaskConical size={18} /> Analyser
      </button>
      <button className="btn btn-secondary" onClick={onReset}>
        <RotateCcw size={18} /> Réinitialiser
      </button>
      <button className="btn btn-ghost" onClick={onHistory}>
        <Clock size={18} /> Historique
      </button>
    </div>
  );
}
