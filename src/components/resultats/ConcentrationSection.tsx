// src/components/resultats/ConcentrationSection.tsx
'use client';

import { AnalysisResult } from '@/types/statistics';
import { formatNumber } from '@/lib/utils/formatting';
import LorenzCurve from '@/components/charts/LorenzCurve';
import InterpretationBlock from './InterpretationBlock';
import ExportCSV from '@/components/shared/ExportCSV';
import ExportPDF from '@/components/shared/ExportPDF';

interface ConcentrationSectionProps {
  result: AnalysisResult;
}

export default function ConcentrationSection({ result }: ConcentrationSectionProps) {
  if (!result.concentration) return null;
  const c = result.concentration;

  const tableData = c.tableau.map(r => {
    const obj: Record<string, unknown> = {};
    Object.entries(r).forEach(([k, v]) => { obj[k] = v; });
    return obj;
  });

  return (
    <div className="concentration-section" id="concentration-section">
      <div className="section-header">
        <h2>📊 Concentration</h2>
        <div className="section-actions">
          <ExportCSV data={tableData} filename={`concentration_${result.variable}.csv`} />
          <ExportPDF elementId="concentration-section" />
        </div>
      </div>

      <div className="table-explanation">
        <p>Le tableau de concentration calcule la masse de caractère (si = ni × xi), la fréquence de masse (gi = si/S),
          les masses cumulées (Gi) et l&apos;indice de Gini. La masse globale S = {formatNumber(c.masseGlobale)}.</p>
      </div>

      <div className="table-scroll">
        <table className="stat-table">
          <thead>
            <tr>
              <th>Modalité</th>
              <th>ni</th>
              <th>ci</th>
              <th>si = ni×ci</th>
              <th>gi = si/S</th>
              <th>Gi</th>
              <th>fi</th>
              <th>Fi</th>
              <th>Gi-1+Gi</th>
              <th>(Gi-1+Gi)×fi</th>
            </tr>
          </thead>
          <tbody>
            {c.tableau.map((row, i) => (
              <tr key={i}>
                <td>{row.modalite}</td>
                <td>{row.ni}</td>
                <td>{formatNumber(row.ci)}</td>
                <td>{formatNumber(row.si)}</td>
                <td>{formatNumber(row.gi, 4)}</td>
                <td>{formatNumber(row.Gi, 4)}</td>
                <td>{formatNumber(row.fi, 4)}</td>
                <td>{formatNumber(row.Fi, 4)}</td>
                <td>{formatNumber(row.GiPrevPlusGi, 4)}</td>
                <td>{formatNumber(row.product, 4)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-total">
              <td><strong>Total</strong></td>
              <td><strong>{result.effectifTotal}</strong></td>
              <td>—</td>
              <td><strong>{formatNumber(c.masseGlobale)}</strong></td>
              <td><strong>1</strong></td>
              <td>—</td>
              <td><strong>1</strong></td>
              <td>—</td>
              <td>—</td>
              <td><strong>{formatNumber(1 - c.indiceGini, 4)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="gini-result">
        <div className="gini-badge">
          <span className="gini-label">Indice de Gini</span>
          <span className="gini-value">IG = {formatNumber(c.indiceGini, 4)}</span>
        </div>
        <div className="gini-formula">
          IG = 1 − Σ fi(Gi-1 + Gi) = 1 − {formatNumber(1 - c.indiceGini, 4)} = {formatNumber(c.indiceGini, 4)}
        </div>
        {c.medianeMasse !== null && (
          <div className="gini-mediane-masse">
            Médiane de masse Ml = {formatNumber(c.medianeMasse)} (valeur de xi pour laquelle Gi = 0,5)
          </div>
        )}
      </div>

      {c.giniDetail && (
        <InterpretationBlock title="Interprétation de la concentration" content={c.giniDetail} />
      )}

      <InterpretationBlock
        title="Lecture de la courbe de Lorenz"
        content="La diagonale d'égalité représente une répartition parfaitement égalitaire. Plus la courbe de Lorenz s'éloigne de cette diagonale, plus la concentration est forte. L'indice de Gini (IG) mesure cette aire : IG = 0 signifie égalité parfaite, IG proche de 1 signifie concentration maximale."
      />

      <LorenzCurve concentration={c} title="Courbe de Lorenz" />
    </div>
  );
}
