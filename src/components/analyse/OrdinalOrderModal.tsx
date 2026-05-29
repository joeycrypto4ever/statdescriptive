// src/components/analyse/OrdinalOrderModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import { detectOrdinalScale } from '@/lib/engines/codage/codageMap';

interface OrdinalOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalites: string[];
  onConfirm: (order: string[]) => void;
}

export default function OrdinalOrderModal({ isOpen, onClose, modalites, onConfirm }: OrdinalOrderModalProps) {
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => {
    // Try to auto-detect
    const detected = detectOrdinalScale(modalites);
    if (detected) {
      setOrder(detected);
    } else {
      setOrder([...modalites]);
    }
  }, [modalites]);

  const moveUp = (i: number) => {
    if (i === 0) return;
    const newOrder = [...order];
    [newOrder[i - 1], newOrder[i]] = [newOrder[i], newOrder[i - 1]];
    setOrder(newOrder);
  };

  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    const newOrder = [...order];
    [newOrder[i], newOrder[i + 1]] = [newOrder[i + 1], newOrder[i]];
    setOrder(newOrder);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Définir l'ordre des modalités">
      <p className="ordinal-hint">
        Ordonnez les modalités du plus faible au plus fort. Cet ordre est obligatoire pour les variables ordinales.
      </p>
      <div className="ordinal-list">
        {order.map((m, i) => (
          <div key={m} className="ordinal-item">
            <GripVertical size={16} className="ordinal-grip" />
            <span className="ordinal-rank">{i + 1}</span>
            <span className="ordinal-label">{m}</span>
            <div className="ordinal-actions">
              <button onClick={() => moveUp(i)} disabled={i === 0}><ArrowUp size={16} /></button>
              <button onClick={() => moveDown(i)} disabled={i === order.length - 1}><ArrowDown size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={() => onConfirm(order)} style={{ marginTop: 16, width: '100%' }}>
        Confirmer l&apos;ordre et analyser
      </button>
    </Modal>
  );
}
