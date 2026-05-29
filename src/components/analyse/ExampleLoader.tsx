// src/components/analyse/ExampleLoader.tsx
'use client';

import { Lightbulb } from 'lucide-react';

const EXAMPLES: { label: string; type: string; csv: string }[] = [
  {
    label: 'Nominale',
    type: 'qualitative_nominale',
    csv: `Couleur,Effectif\nBleu,45\nRouge,34\nVert,21\nJaune,28\nOrange,22`,
  },
  {
    label: 'Ordinale',
    type: 'qualitative_ordinale',
    csv: `Niveau,Effectif\nNul,5\nMédiocre,12\nMoyen,18\nBien,9\nExcellent,6`,
  },
  {
    label: 'Ordinale codée',
    type: 'codage',
    csv: `Satisfaction,Effectif\nTrès insatisfait,8\nInsatisfait,15\nNeutre,22\nSatisfait,30\nTrès satisfait,12`,
  },
  {
    label: 'Discrète',
    type: 'quantitative_discrete',
    csv: `NbEnfants,Effectif\n0,6\n1,4\n2,5\n3,2\n4,1`,
  },
  {
    label: 'Continue égales',
    type: 'continue_egales',
    csv: `Classe,Effectif\n[0;5[,2\n[5;10[,7\n[10;15[,18\n[15;20[,3`,
  },
  {
    label: 'Continue inégales',
    type: 'continue_inegales',
    csv: `Classe,Effectif\n[20;25[,9\n[25;30[,17\n[30;35[,36\n[35;40[,27\n[40;50[,45\n[50;60[,6`,
  },
];

interface ExampleLoaderProps {
  onLoad: (csv: string) => void;
}

export default function ExampleLoader({ onLoad }: ExampleLoaderProps) {
  return (
    <div className="example-loader">
      <div className="example-loader-header">
        <Lightbulb size={18} />
        <h4>Exemples pédagogiques</h4>
      </div>
      <div className="example-grid">
        {EXAMPLES.map(ex => (
          <button key={ex.label} className="example-btn" onClick={() => onLoad(ex.csv)}>
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
