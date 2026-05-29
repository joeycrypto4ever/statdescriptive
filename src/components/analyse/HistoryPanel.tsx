// src/components/analyse/HistoryPanel.tsx
'use client';

import { HistoryEntry } from '@/types/analysis';
import { TYPE_LABELS } from '@/lib/utils/constants';
import { formatDate } from '@/lib/utils/formatting';
import { Trash2, RefreshCw, X } from 'lucide-react';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onLoad: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export default function HistoryPanel({ history, onLoad, onRemove, onClearAll, onClose }: HistoryPanelProps) {
  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>🕐 Historique des analyses</h3>
        <div className="history-actions">
          {history.length > 0 && (
            <button className="btn btn-sm btn-danger" onClick={onClearAll}>
              <Trash2 size={14} /> Tout supprimer
            </button>
          )}
          <button className="btn btn-sm btn-ghost" onClick={onClose}><X size={16} /></button>
        </div>
      </div>
      {history.length === 0 ? (
        <p className="history-empty">Aucune analyse enregistrée.</p>
      ) : (
        <div className="history-list">
          {history.map(entry => (
            <div key={entry.id} className="history-item">
              <div className="history-item-info">
                <strong>{entry.variable}</strong>
                <span className="history-item-type">{TYPE_LABELS[entry.type]}</span>
                <span className="history-item-date">{formatDate(entry.timestamp)}</span>
                <span className="history-item-n">n = {entry.effectifTotal}</span>
              </div>
              <div className="history-item-actions">
                <button className="btn btn-sm btn-primary" onClick={() => onLoad(entry)}>
                  <RefreshCw size={14} /> Recharger
                </button>
                <button className="btn btn-sm btn-ghost" onClick={() => onRemove(entry.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
