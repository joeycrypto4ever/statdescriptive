// src/components/resultats/StatTable.tsx
'use client';

import { AnalysisResult, FrequencyRow, ClassRow } from '@/types/statistics';
import { formatNumber } from '@/lib/utils/formatting';
import InterpretationBlock from './InterpretationBlock';
import ExportCSV from '@/components/shared/ExportCSV';
import ExportPDF from '@/components/shared/ExportPDF';

interface StatTableProps {
  result: AnalysisResult;
}

export default function StatTable({ result }: StatTableProps) {
  const isClass = result.type === 'continue_egales' || result.type === 'continue_inegales';
  const isNominale = result.type === 'qualitative_nominale';
  const isOrdinale = result.type === 'qualitative_ordinale' || result.type === 'codage';
  const isInegales = result.type === 'continue_inegales';

  const tableData = result.tableau.map(r => {
    const obj: Record<string, unknown> = {};
    Object.entries(r).forEach(([k, v]) => { obj[k] = v; });
    return obj;
  });

  return (
    <div className="stat-table-section" id="stat-table-section">
      <div className="section-header">
        <h2>📊 Tableau Statistique</h2>
        <div className="section-actions">
          <ExportCSV data={tableData} filename={`tableau_${result.variable}.csv`} />
          <ExportPDF elementId="stat-table-section" />
        </div>
      </div>

      <div className="table-explanation">
        {isNominale && <p>Ce tableau présente les effectifs (ni), fréquences (fi), pourcentages et angles (αi = fi × 360°) pour chaque modalité.</p>}
        {isOrdinale && <p>Ce tableau présente les effectifs, fréquences, cumulés croissants (Nicc, Ficc) et décroissants (Ficd). Les modalités sont ordonnées.</p>}
        {isClass && !isInegales && <p>Ce tableau présente les classes avec amplitudes (ai), centres (ci), effectifs, fréquences et cumulés. La colonne densité est facultative car les amplitudes sont égales.</p>}
        {isInegales && <p>⚠ Classes d&apos;amplitudes INÉGALES : les colonnes densité (di = ni/ai) et effectifs corrigés (nic = di × ppcm) sont OBLIGATOIRES. La classe modale se détermine par di le plus élevé.</p>}
      </div>

      <div className="table-scroll">
        <table className="stat-table">
          <thead>
            <tr>
              {isClass ? (
                <>
                  <th>Classe</th>
                  <th>ni</th>
                  <th>ai</th>
                  <th>ci</th>
                  <th>fi</th>
                  <th>fi (%)</th>
                  {isInegales && <th>di</th>}
                  {isInegales && <th>nic</th>}
                  <th>Nicc</th>
                  <th>Nicd</th>
                  <th>Ficc</th>
                  <th>Ficd</th>
                </>
              ) : (
                <>
                  <th>Modalité</th>
                  {result.tableau[0] && 'xi' in result.tableau[0] && (result.tableau[0] as FrequencyRow).xi !== null && <th>xi</th>}
                  <th>ni</th>
                  <th>fi</th>
                  <th>fi (%)</th>
                  {isNominale && <th>αi (°)</th>}
                  {!isNominale && <th>Nicc</th>}
                  {!isNominale && <th>Ficc</th>}
                  {!isNominale && <th>Ficd</th>}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {result.tableau.map((row, i) => {
              if (isClass) {
                const r = row as ClassRow;
                return (
                  <tr key={i}>
                    <td>{r.classe}</td>
                    <td>{r.ni}</td>
                    <td>{formatNumber(r.ai)}</td>
                    <td>{formatNumber(r.ci)}</td>
                    <td>{formatNumber(r.fi, 4)}</td>
                    <td>{formatNumber(r.fiPercent)}%</td>
                    {isInegales && <td className="highlight-density">{formatNumber(r.di || 0, 4)}</td>}
                    {isInegales && <td>{formatNumber(r.nic || 0)}</td>}
                    <td>{r.Nicc}</td>
                    <td>{r.Nicd}</td>
                    <td>{formatNumber(r.Ficc, 4)}</td>
                    <td>{formatNumber(r.Ficd, 4)}</td>
                  </tr>
                );
              } else {
                const r = row as FrequencyRow;
                return (
                  <tr key={i}>
                    <td>{r.modalite}</td>
                    {r.xi !== null && <td>{r.xi}</td>}
                    <td>{r.ni}</td>
                    <td>{formatNumber(r.fi, 4)}</td>
                    <td>{formatNumber(r.fiPercent)}%</td>
                    {isNominale && <td>{formatNumber(r.angleDeg || 0)}°</td>}
                    {!isNominale && <td>{r.Nicc}</td>}
                    {!isNominale && <td>{formatNumber(r.Ficc || 0, 4)}</td>}
                    {!isNominale && <td>{formatNumber(r.Ficd || 0, 4)}</td>}
                  </tr>
                );
              }
            })}
          </tbody>
          <tfoot>
            <tr className="table-total">
              <td><strong>Total</strong></td>
              {isClass ? (
                <>
                  <td><strong>{result.effectifTotal}</strong></td>
                  <td>—</td><td>—</td>
                  <td><strong>1</strong></td>
                  <td><strong>100%</strong></td>
                  {isInegales && <td>—</td>}
                  {isInegales && <td>—</td>}
                  <td>—</td><td>—</td><td>—</td><td>—</td>
                </>
              ) : (
                <>
                  {(result.tableau[0] as FrequencyRow)?.xi !== null && <td>—</td>}
                  <td><strong>{result.effectifTotal}</strong></td>
                  <td><strong>1</strong></td>
                  <td><strong>100%</strong></td>
                  {isNominale && <td><strong>360°</strong></td>}
                  {!isNominale && <td>—</td>}
                  {!isNominale && <td>—</td>}
                  {!isNominale && <td>—</td>}
                </>
              )}
            </tr>
          </tfoot>
        </table>
      </div>

      {result.interpretations.tableau && (
        <InterpretationBlock title="Interprétation du tableau" content={result.interpretations.tableau} />
      )}
      {result.interpretations.piege && (
        <InterpretationBlock title="Piège à éviter" content={result.interpretations.piege} variant="warning" />
      )}
    </div>
  );
}
