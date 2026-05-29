// src/components/resultats/ChartSection.tsx
'use client';

import { AnalysisResult, FrequencyRow, ClassRow } from '@/types/statistics';
import StatBarChart from '@/components/charts/BarChart';
import StatPieChart from '@/components/charts/PieChart';
import Histogram from '@/components/charts/Histogram';
import FrequencyPolygon from '@/components/charts/FrequencyPolygon';
import CumulativeCurve from '@/components/charts/CumulativeCurve';
import BoxPlotChart from '@/components/charts/BoxPlot';
import LorenzCurve from '@/components/charts/LorenzCurve';
import InterpretationBlock from './InterpretationBlock';
import ExportPDF from '@/components/shared/ExportPDF';

interface ChartSectionProps {
  result: AnalysisResult;
}

export default function ChartSection({ result }: ChartSectionProps) {
  const charts = result.compatibleCharts;
  const isInegales = result.type === 'continue_inegales';

  return (
    <div className="chart-section" id="chart-section">
      <div className="section-header">
        <h2>📈 Graphiques</h2>
        <ExportPDF elementId="chart-section" label="Exporter graphiques PDF" />
      </div>

      {result.interpretations.graphiques && (
        <InterpretationBlock title="Graphiques compatibles" content={result.interpretations.graphiques} />
      )}

      {charts.includes('barres') && (
        <StatBarChart rows={result.tableau as FrequencyRow[]} title="Diagramme en barres (tuyaux d'orgues)" />
      )}

      {charts.includes('circulaire') && (
        <StatPieChart rows={result.tableau as FrequencyRow[]} title="Diagramme circulaire" />
      )}

      {charts.includes('batons') && (
        <StatBarChart rows={result.tableau as FrequencyRow[]} title="Diagramme en bâtons" />
      )}

      {charts.includes('histogramme') && (
        <Histogram
          rows={result.tableau as ClassRow[]}
          usesDensity={isInegales}
          title={isInegales ? 'Histogramme (hauteur = di)' : 'Histogramme (hauteur = ni)'}
        />
      )}

      {charts.includes('polygone') && (
        <FrequencyPolygon
          rows={result.tableau as ClassRow[]}
          title={isInegales ? 'Polygone des effectifs corrigés (nic)' : 'Polygone des fréquences'}
        />
      )}

      {charts.includes('cumulative') && (
        <CumulativeCurve
          rows={result.tableau as (FrequencyRow | ClassRow)[]}
          mediane={result.centralTendency.mediane}
          Q1={result.dispersion?.Q1}
          Q3={result.dispersion?.Q3}
          title="Courbe cumulative des fréquences (ogive)"
        />
      )}

      {charts.includes('boite') && result.boxPlot && (
        <>
          <BoxPlotChart data={result.boxPlot} title="Boîte à moustaches (Box-plot)" />
          <InterpretationBlock
            title="Lecture de la boîte à moustaches"
            content={`Boîte : [Q1=${result.boxPlot.Q1} ; Q3=${result.boxPlot.Q3}], contenant 50% des valeurs centrales. Médiane = ${result.boxPlot.mediane}. Moustache gauche = Max(xmin ; Q1 − 1,5×IQ) = ${result.boxPlot.moustacheBas}. Moustache droite = Min(xmax ; Q3 + 1,5×IQ) = ${result.boxPlot.moustacheHaut}.${result.boxPlot.valeursAberrantes.length > 0 ? ` Valeurs aberrantes détectées : ${result.boxPlot.valeursAberrantes.join(', ')}.` : ' Aucune valeur aberrante détectée.'}`}
          />
        </>
      )}

      {charts.includes('lorenz') && result.concentration && (
        <LorenzCurve concentration={result.concentration} title="Courbe de Lorenz" />
      )}
    </div>
  );
}
