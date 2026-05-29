// src/components/shared/ExportPDF.tsx
'use client';

import { FileDown } from 'lucide-react';
import { printElement } from '@/lib/utils/export';

interface ExportPDFProps {
  elementId: string;
  label?: string;
}

export default function ExportPDF({ elementId, label = 'Exporter PDF' }: ExportPDFProps) {
  return (
    <button className="btn btn-secondary" onClick={() => printElement(elementId)}>
      <FileDown size={16} />
      {label}
    </button>
  );
}
