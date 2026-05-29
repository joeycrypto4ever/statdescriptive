// src/components/analyse/FileImport.tsx
'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileImportProps {
  onFileLoaded: (csv: string) => void;
}

export default function FileImport({ onFileLoaded }: FileImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'csv' || ext === 'txt') {
      const text = await file.text();
      onFileLoaded(text);
    } else if (ext === 'xlsx' || ext === 'xls') {
      const { parseFile } = await import('@/lib/parsers/excelParser');
      const parsed = await parseFile(file);
      // Reconstruct CSV from parsed data
      const csv = [parsed.headers.join(','), ...parsed.rows.map(r => parsed.headers.map(h => r[h]).join(','))].join('\n');
      onFileLoaded(csv);
    } else {
      alert('Format non supporté. Utilisez CSV, TXT ou Excel.');
    }

    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="file-import">
      <input ref={fileRef} type="file" accept=".csv,.txt,.xlsx,.xls" onChange={handleFile} hidden />
      <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
        <Upload size={18} />
        Importer un fichier (CSV, TXT, Excel)
      </button>
    </div>
  );
}
