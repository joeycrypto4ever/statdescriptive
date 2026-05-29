// src/components/analyse/VariableSelector.tsx
'use client';

import { VariableInfo } from '@/types/analysis';
import { BarChart3, Hash, Type, User } from 'lucide-react';

interface VariableSelectorProps {
  variables: VariableInfo[];
  onSelect: (name: string) => void;
}

export default function VariableSelector({ variables, onSelect }: VariableSelectorProps) {
  return (
    <div className="variable-selector">
      <h3>Quelle variable voulez-vous analyser ?</h3>
      <p className="variable-hint">
        Les colonnes identifiées comme des noms ou identifiants sont marquées et non analysables.
      </p>
      <div className="variable-grid">
        {variables.map(v => (
          <button
            key={v.name}
            className={`variable-card ${v.isIdentifier ? 'variable-card-disabled' : ''}`}
            onClick={() => v.isAnalyzable && onSelect(v.name)}
            disabled={!v.isAnalyzable}
          >
            <div className="variable-card-icon">
              {v.isIdentifier ? <User size={20} /> : v.isNumeric ? <Hash size={20} /> : v.isClass ? <BarChart3 size={20} /> : <Type size={20} />}
            </div>
            <div className="variable-card-info">
              <strong>{v.name}</strong>
              <span className="variable-card-meta">
                {v.isIdentifier ? '(Identifiant — non analysable)' :
                  `${v.uniqueCount} valeurs uniques / ${v.totalCount} observations`}
              </span>
              <span className="variable-card-sample">
                Ex: {v.sampleValues.slice(0, 3).join(', ')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
