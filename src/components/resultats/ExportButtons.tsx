// src/components/resultats/ExportButtons.tsx
'use client';

import { Printer } from 'lucide-react';
import { printElement } from '@/lib/utils/export';

export default function ExportButtons() {
  return (
    <div className="export-buttons">
      <button className="btn btn-primary btn-lg" onClick={() => printElement('print-report')}>
        <Printer size={20} />
        Imprimer l&apos;analyse complète
      </button>
    </div>
  );
}
