// src/components/shared/ExportCSV.tsx
'use client';

import { FileSpreadsheet } from 'lucide-react';
import { downloadFile, arrayToCSV } from '@/lib/utils/export';

interface ExportCSVProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
}

export default function ExportCSV({ data, filename, label = 'Exporter CSV' }: ExportCSVProps) {
  const handleExport = () => {
    const csv = arrayToCSV(data);
    downloadFile(csv, filename);
  };

  return (
    <button className="btn btn-secondary" onClick={handleExport}>
      <FileSpreadsheet size={16} />
      {label}
    </button>
  );
}
