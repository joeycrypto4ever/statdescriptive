// src/components/resultats/Indicators.tsx
'use client';

import { AnalysisResult } from '@/types/statistics';
import { formatNumber } from '@/lib/utils/formatting';
import { COMPATIBLE_INDICATORS } from '@/lib/utils/constants';
import InterpretationBlock from './InterpretationBlock';

interface IndicatorsProps {
  result: AnalysisResult;
}

export default function Indicators({ result }: IndicatorsProps) {
  const compat = COMPATIBLE_INDICATORS[result.type];
  const { centralTendency: ct, dispersion: d, forme: f } = result;

  return (
    <div className="indicators-section" id="indicators-section">
      <h2>📐 Indicateurs Statistiques</h2>

      {/* Tendance centrale */}
      <div className="indicator-group">
        <h3 className="indicator-group-title">Paramètres de position (tendance centrale)</h3>
        <div className="indicator-cards">
          {compat.includes('mode') && (
            <div className="indicator-card">
              <span className="indicator-label">Mode (Mo)</span>
              <span className="indicator-value">{ct.modeLabel || String(ct.mode)}</span>
              <span className="indicator-formula">Modalité avec ni (ou di) le plus élevé</span>
            </div>
          )}
          {compat.includes('mediane') && ct.mediane !== null && (
            <div className="indicator-card">
              <span className="indicator-label">Médiane (Me)</span>
              <span className="indicator-value">{formatNumber(ct.mediane)}</span>
              <span className="indicator-formula">Valeur qui partage la série en 2 parties égales</span>
            </div>
          )}
          {compat.includes('moyenne') && ct.moyenne !== null && (
            <div className="indicator-card">
              <span className="indicator-label">Moyenne (X̄)</span>
              <span className="indicator-value">{formatNumber(ct.moyenne)}</span>
              <span className="indicator-formula">X̄ = Σ(fi × xi)</span>
            </div>
          )}
        </div>
        {result.interpretations.mode && <InterpretationBlock title="Mode" content={result.interpretations.mode} />}
        {result.interpretations.mediane && <InterpretationBlock title="Médiane" content={result.interpretations.mediane} />}
        {result.interpretations.moyenne && <InterpretationBlock title="Moyenne" content={result.interpretations.moyenne} />}
        {result.interpretations.synthese_position && (
          <InterpretationBlock title="Synthèse X̄ vs Me vs Mo" content={result.interpretations.synthese_position} variant="success" />
        )}
      </div>

      {/* Dispersion */}
      {d && (
        <div className="indicator-group">
          <h3 className="indicator-group-title">Paramètres de dispersion</h3>
          <div className="indicator-cards">
            {compat.includes('variance') && d.variance !== null && (
              <div className="indicator-card">
                <span className="indicator-label">Variance V(X)</span>
                <span className="indicator-value">{formatNumber(d.variance, 4)}</span>
                <span className="indicator-formula">V(X) = Σfi(xi − X̄)²</span>
              </div>
            )}
            {compat.includes('ecartType') && d.ecartType !== null && (
              <div className="indicator-card">
                <span className="indicator-label">Écart-type (σ)</span>
                <span className="indicator-value">{formatNumber(d.ecartType, 4)}</span>
                <span className="indicator-formula">σ = √V(X)</span>
              </div>
            )}
            {compat.includes('etendue') && d.etendue !== null && (
              <div className="indicator-card">
                <span className="indicator-label">Étendue</span>
                <span className="indicator-value">{formatNumber(d.etendue)}</span>
                <span className="indicator-formula">xmax − xmin</span>
              </div>
            )}
            {compat.includes('CV') && d.CV !== null && (
              <div className="indicator-card">
                <span className="indicator-label">CV</span>
                <span className="indicator-value">{formatNumber(d.CV * 100)}%</span>
                <span className="indicator-formula">CV = σ / X̄</span>
              </div>
            )}
            {compat.includes('Q1') && d.Q1 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">Q1</span>
                <span className="indicator-value">{formatNumber(d.Q1)}</span>
                <span className="indicator-formula">25% des valeurs ≤ Q1</span>
              </div>
            )}
            {compat.includes('Q3') && d.Q3 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">Q3</span>
                <span className="indicator-value">{formatNumber(d.Q3)}</span>
                <span className="indicator-formula">75% des valeurs ≤ Q3</span>
              </div>
            )}
            {compat.includes('IQ') && d.IQ !== null && (
              <div className="indicator-card">
                <span className="indicator-label">IQ</span>
                <span className="indicator-value">{formatNumber(d.IQ)}</span>
                <span className="indicator-formula">IQ = Q3 − Q1</span>
              </div>
            )}
            {compat.includes('D1') && d.D1 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">D1</span>
                <span className="indicator-value">{formatNumber(d.D1)}</span>
                <span className="indicator-formula">10% ≤ D1</span>
              </div>
            )}
            {compat.includes('D9') && d.D9 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">D9</span>
                <span className="indicator-value">{formatNumber(d.D9)}</span>
                <span className="indicator-formula">90% ≤ D9</span>
              </div>
            )}
          </div>
          {result.interpretations.dispersion && <InterpretationBlock title="Variance & Écart-type" content={result.interpretations.dispersion} />}
          {result.interpretations.cv && <InterpretationBlock title="Coefficient de variation" content={result.interpretations.cv} />}
          {result.interpretations.quartiles && <InterpretationBlock title="Quartiles" content={result.interpretations.quartiles} />}
          {result.interpretations.deciles && <InterpretationBlock title="Déciles" content={result.interpretations.deciles} />}
        </div>
      )}

      {/* Forme */}
      {f && (
        <div className="indicator-group">
          <h3 className="indicator-group-title">Paramètres de forme</h3>
          <div className="indicator-cards">
            {compat.includes('gamma1') && f.gamma1 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">γ1 (asymétrie)</span>
                <span className="indicator-value">{formatNumber(f.gamma1, 4)}</span>
                <span className="indicator-formula">γ1 = μ3 / σ³</span>
              </div>
            )}
            {compat.includes('gamma2') && f.gamma2 !== null && (
              <div className="indicator-card">
                <span className="indicator-label">γ2 (aplatissement)</span>
                <span className="indicator-value">{formatNumber(f.gamma2, 4)}</span>
                <span className="indicator-formula">γ2 = μ4/σ⁴ − 3</span>
              </div>
            )}
          </div>
          {result.interpretations.asymetrie && <InterpretationBlock title="Asymétrie (γ1)" content={result.interpretations.asymetrie} />}
          {result.interpretations.aplatissement && <InterpretationBlock title="Aplatissement (γ2)" content={result.interpretations.aplatissement} />}
        </div>
      )}

      {result.interpretations.limites && (
        <InterpretationBlock title="Limites pour ce type" content={result.interpretations.limites} variant="warning" />
      )}
    </div>
  );
}
