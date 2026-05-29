// src/app/analyse/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnalysisProvider, useAnalysisContext } from '@/context/AnalysisContext';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useHistory } from '@/hooks/useHistory';
import CsvInput from '@/components/analyse/CsvInput';
import FileImport from '@/components/analyse/FileImport';
import VariableSelector from '@/components/analyse/VariableSelector';
import TypeSelector from '@/components/analyse/TypeSelector';
import OrdinalOrderModal from '@/components/analyse/OrdinalOrderModal';
import ExampleLoader from '@/components/analyse/ExampleLoader';
import ActionBar from '@/components/analyse/ActionBar';
import HistoryPanel from '@/components/analyse/HistoryPanel';
import ResultHeader from '@/components/resultats/ResultHeader';
import StatTable from '@/components/resultats/StatTable';
import Indicators from '@/components/resultats/Indicators';
import ChartSection from '@/components/resultats/ChartSection';
import ConcentrationSection from '@/components/resultats/ConcentrationSection';
import ExportButtons from '@/components/resultats/ExportButtons';
import PrintReport from '@/components/resultats/PrintReport';
import { StatType } from '@/types/statistics';
import { COMPATIBLE_CONCENTRATION } from '@/lib/utils/constants';
import { detectType } from '@/lib/detection/typeDetector';
import { extractModalitiesWithEffectifs } from '@/lib/parsers/csvParser';

function AnalyseContent() {
  const { state, dispatch, loadCsv, selectVariable, runAnalysis, reset } = useAnalysis();
  const { history, save, remove, clearAll } = useHistory();
  const [showHistory, setShowHistory] = useState(false);
  const [showOrdinalModal, setShowOrdinalModal] = useState(false);
  const [pendingType, setPendingType] = useState<StatType | 'auto'>('auto');
  const [activeTab, setActiveTab] = useState<'tableau' | 'indicateurs' | 'graphiques' | 'concentration'>('tableau');

  // Save result to history when analysis completes
  useEffect(() => {
    if (state.result) {
      save(state.result, state.rawCsv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.result]);

  const handleTypeSelect = (type: StatType | 'auto') => {
    const needsOrdinal = type === 'qualitative_ordinale' || type === 'codage';

    // Auto-detect check
    if (type === 'auto' && state.parsedData && state.selectedVariable) {
      const varInfo = state.variables.find(v => v.name === state.selectedVariable);
      if (varInfo) {
        const detected = detectType(state.parsedData, state.selectedVariable, varInfo);
        dispatch({ type: 'SET_DETECTED_TYPE', payload: detected });
        if (detected === 'qualitative_ordinale' || detected === 'codage') {
          setPendingType(detected);
          setShowOrdinalModal(true);
          return;
        }
      }
    }

    if (needsOrdinal) {
      setPendingType(type);
      setShowOrdinalModal(true);
    } else {
      runAnalysis(type);
    }
  };

  const handleOrdinalConfirm = (order: string[]) => {
    dispatch({ type: 'SET_ORDINAL_ORDER', payload: order });
    setShowOrdinalModal(false);
    runAnalysis(pendingType, order);
  };

  const getModalites = (): string[] => {
    if (!state.parsedData || !state.selectedVariable) return [];
    const items = extractModalitiesWithEffectifs(state.parsedData, state.selectedVariable);
    return items.map(i => i.modalite);
  };

  const handleHistoryLoad = (entry: import('@/types/analysis').HistoryEntry) => {
    dispatch({ type: 'SET_RESULT', payload: entry.result });
    dispatch({ type: 'SET_RAW_CSV', payload: entry.rawData });
    setShowHistory(false);
    setActiveTab('tableau');
  };

  // Results view
  if (state.step === 'results' && state.result) {
    const showConcentration = COMPATIBLE_CONCENTRATION[state.result.type] && state.result.concentration;
    return (
      <div className="analyse-page">
        <ResultHeader result={state.result} />
        <div className="result-tabs">
          <button className={`tab ${activeTab === 'tableau' ? 'tab-active' : ''}`} onClick={() => setActiveTab('tableau')}>📊 Tableau</button>
          <button className={`tab ${activeTab === 'indicateurs' ? 'tab-active' : ''}`} onClick={() => setActiveTab('indicateurs')}>📐 Indicateurs</button>
          <button className={`tab ${activeTab === 'graphiques' ? 'tab-active' : ''}`} onClick={() => setActiveTab('graphiques')}>📈 Graphiques</button>
          {showConcentration && (
            <button className={`tab ${activeTab === 'concentration' ? 'tab-active' : ''}`} onClick={() => setActiveTab('concentration')}>📊 Concentration</button>
          )}
        </div>
        <div className="result-content">
          {activeTab === 'tableau' && <StatTable result={state.result} />}
          {activeTab === 'indicateurs' && <Indicators result={state.result} />}
          {activeTab === 'graphiques' && <ChartSection result={state.result} />}
          {activeTab === 'concentration' && showConcentration && <ConcentrationSection result={state.result} />}
        </div>
        <ExportButtons />
        <PrintReport result={state.result} />
      </div>
    );
  }

  return (
    <div className="analyse-page">
      <h1 className="analyse-title">🔬 Analyse Statistique</h1>

      <ActionBar
        onAnalyze={() => {}}
        onReset={reset}
        onHistory={() => setShowHistory(!showHistory)}
        canAnalyze={false}
      />

      {showHistory && (
        <HistoryPanel
          history={history}
          onLoad={handleHistoryLoad}
          onRemove={remove}
          onClearAll={clearAll}
          onClose={() => setShowHistory(false)}
        />
      )}

      {state.error && (
        <div className="error-box">
          <strong>Erreur :</strong> {state.error}
        </div>
      )}

      {state.step === 'input' && (
        <>
          <div className="input-row">
            <CsvInput onSubmit={loadCsv} />
            <div className="input-divider">
              <span>ou</span>
            </div>
            <FileImport onFileLoaded={loadCsv} />
          </div>
          <ExampleLoader onLoad={loadCsv} />
        </>
      )}

      {state.step === 'variable_select' && state.variables.length > 0 && (
        <VariableSelector
          variables={state.variables}
          onSelect={selectVariable}
        />
      )}

      {state.step === 'type_select' && (
        <TypeSelector
          detectedType={state.detectedType}
          onSelect={handleTypeSelect}
        />
      )}

      <OrdinalOrderModal
        isOpen={showOrdinalModal}
        onClose={() => setShowOrdinalModal(false)}
        modalites={getModalites()}
        onConfirm={handleOrdinalConfirm}
      />
    </div>
  );
}

export default function AnalysePage() {
  return (
    <AnalysisProvider>
      <AnalyseContent />
    </AnalysisProvider>
  );
}