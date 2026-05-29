// src/components/analyse/CsvInput.tsx
'use client';

import { useState } from 'react';
import { ClipboardPaste, FileText } from 'lucide-react';

interface CsvInputProps {
  onSubmit: (csv: string) => void;
}

export default function CsvInput({ onSubmit }: CsvInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) onSubmit(text.trim());
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
    } catch { /* ignore */ }
  };

  return (
    <div className="csv-input">
      <div className="csv-input-header">
        <FileText size={20} />
        <h3>Saisie CSV</h3>
        <button className="btn btn-sm btn-ghost" onClick={handlePaste}>
          <ClipboardPaste size={16} /> Coller
        </button>
      </div>
      <textarea
        className="csv-textarea"
        placeholder={`Collez vos données CSV ici...\n\nExemples :\n\nCouleur,Effectif\nBleu,45\nRouge,34\nVert,21\n\nOu :\n\nEtudiant,Note,Age\nJean,15,20\nMarie,17,22`}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={12}
      />
      <button className="btn btn-primary" onClick={handleSubmit} disabled={!text.trim()}>
        Charger les données
      </button>
    </div>
  );
}
