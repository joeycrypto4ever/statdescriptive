// src/components/analyse/CsvInput.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardPaste, FileText, HelpCircle } from 'lucide-react';

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
        <Link
          href="/guide"
          className="csv-help-link"
          title="Voir le guide d'utilisation"
          aria-label="Aide : guide d'utilisation"
        >
          <HelpCircle size={18} />
        </Link>
        <button className="btn btn-sm btn-ghost" onClick={handlePaste}>
          <ClipboardPaste size={16} /> Coller
        </button>
      </div>
      <textarea
        className="csv-textarea"
        placeholder="Collez vos données CSV ici..."
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
