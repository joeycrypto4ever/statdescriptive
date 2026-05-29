// src/components/resultats/InterpretationBlock.tsx
'use client';

import { BookOpen } from 'lucide-react';

interface InterpretationBlockProps {
  title: string;
  content: string;
  variant?: 'info' | 'warning' | 'success';
}

export default function InterpretationBlock({ title, content, variant = 'info' }: InterpretationBlockProps) {
  if (!content) return null;

  return (
    <div className={`interpretation-block interpretation-${variant}`}>
      <div className="interpretation-header">
        <BookOpen size={16} />
        <strong>{title}</strong>
      </div>
      <p>{content}</p>
    </div>
  );
}
