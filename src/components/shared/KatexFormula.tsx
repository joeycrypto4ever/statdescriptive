// src/components/shared/KatexFormula.tsx
'use client';

interface KatexFormulaProps {
  formula: string;
  block?: boolean;
}

export default function KatexFormula({ formula, block = false }: KatexFormulaProps) {
  return (
    <span
      className={`formula ${block ? 'formula-block' : 'formula-inline'}`}
    >
      {formula}
    </span>
  );
}
