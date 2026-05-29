// src/components/analyse/TypeSelector.tsx
'use client';

import { StatType } from '@/types/statistics';
import { TYPE_LABELS, TYPE_DESCRIPTIONS } from '@/lib/utils/constants';
import { Sparkles } from 'lucide-react';

interface TypeSelectorProps {
  detectedType: StatType | null;
  onSelect: (type: StatType | 'auto') => void;
}

const TYPES: (StatType | 'auto')[] = [
  'auto',
  'qualitative_nominale',
  'qualitative_ordinale',
  'codage',
  'quantitative_discrete',
  'continue_egales',
  'continue_inegales',
];

export default function TypeSelector({ detectedType, onSelect }: TypeSelectorProps) {
  return (
    <div className="type-selector">
      <h3>Sélectionnez le type statistique</h3>
      {detectedType && (
        <p className="type-detected">
          <Sparkles size={16} />
          Type détecté automatiquement : <strong>{TYPE_LABELS[detectedType]}</strong>
        </p>
      )}
      <div className="type-grid">
        {TYPES.map(t => (
          <button
            key={t}
            className={`type-card ${t === 'auto' ? 'type-card-auto' : ''}`}
            onClick={() => onSelect(t)}
          >
            <strong>{t === 'auto' ? '🔮 Détection automatique' : TYPE_LABELS[t as StatType]}</strong>
            <span className="type-card-desc">
              {t === 'auto'
                ? 'Laisser l\'application détecter le type optimal'
                : TYPE_DESCRIPTIONS[t as StatType]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
