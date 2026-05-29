// src/lib/utils/export.ts

/** Download text content as a file */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/csv') {
  const blob = new Blob([content], { type: mimeType + ';charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Export array of objects to CSV string */
export function arrayToCSV(data: Record<string, unknown>[], headers?: string[]): string {
  if (data.length === 0) return '';
  const keys = headers || Object.keys(data[0]);
  const csvRows = [keys.join(',')];
  for (const row of data) {
    csvRows.push(keys.map(k => {
      const val = row[k];
      const str = val === null || val === undefined ? '' : String(val);
      return str.includes(',') ? `"${str}"` : str;
    }).join(','));
  }
  return csvRows.join('\n');
}

/** Trigger browser print for a specific element */
export function printElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(`
    <html>
      <head>
        <title>StatDescriptive - Rapport</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; color: #1a1a2e; }
          table { border-collapse: collapse; width: 100%; margin: 16px 0; }
          th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: center; font-size: 13px; }
          th { background: #1a1a2e; color: white; }
          tr:nth-child(even) { background: #f5f5f5; }
          h1, h2, h3 { color: #1a1a2e; }
          .interpretation { background: #f0f7ff; border-left: 4px solid #3b82f6; padding: 12px; margin: 12px 0; border-radius: 4px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>${element.innerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
}
