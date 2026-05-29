// src/hooks/useHistory.ts
'use client';

import { useState, useEffect } from 'react';
import { HistoryEntry } from '@/types/analysis';
import { AnalysisResult } from '@/types/statistics';
import { generateId } from '@/lib/utils/formatting';

const STORAGE_KEY = 'statdescriptive_history';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const save = (result: AnalysisResult, rawData: string) => {
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      variable: result.variable,
      type: result.type,
      effectifTotal: result.effectifTotal,
      result,
      rawData,
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const remove = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const load = (id: string): HistoryEntry | undefined => {
    return history.find(h => h.id === id);
  };

  return { history, save, remove, clearAll, load };
}
