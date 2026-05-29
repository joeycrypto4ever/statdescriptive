// src/context/AnalysisContext.tsx
'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AnalysisState } from '@/types/analysis';
import { StatType, AnalysisResult } from '@/types/statistics';
import { ParsedData, VariableInfo } from '@/types/analysis';

type Action =
  | { type: 'SET_RAW_CSV'; payload: string }
  | { type: 'SET_PARSED_DATA'; payload: { data: ParsedData; variables: VariableInfo[] } }
  | { type: 'SELECT_VARIABLE'; payload: string }
  | { type: 'SELECT_TYPE'; payload: StatType | 'auto' }
  | { type: 'SET_DETECTED_TYPE'; payload: StatType }
  | { type: 'SET_ORDINAL_ORDER'; payload: string[] }
  | { type: 'SET_RESULT'; payload: AnalysisResult }
  | { type: 'SET_STEP'; payload: AnalysisState['step'] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

const initialState: AnalysisState = {
  step: 'input',
  rawCsv: '',
  parsedData: null,
  variables: [],
  selectedVariable: '',
  selectedType: 'auto',
  detectedType: null,
  ordinalOrder: [],
  result: null,
  error: null,
};

function reducer(state: AnalysisState, action: Action): AnalysisState {
  switch (action.type) {
    case 'SET_RAW_CSV':
      return { ...state, rawCsv: action.payload, error: null };
    case 'SET_PARSED_DATA':
      return {
        ...state,
        parsedData: action.payload.data,
        variables: action.payload.variables,
        step: 'variable_select',
        error: null,
      };
    case 'SELECT_VARIABLE':
      return { ...state, selectedVariable: action.payload, step: 'type_select' };
    case 'SELECT_TYPE':
      return { ...state, selectedType: action.payload };
    case 'SET_DETECTED_TYPE':
      return { ...state, detectedType: action.payload };
    case 'SET_ORDINAL_ORDER':
      return { ...state, ordinalOrder: action.payload };
    case 'SET_RESULT':
      return { ...state, result: action.payload, step: 'results', error: null };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

interface AnalysisContextType {
  state: AnalysisState;
  dispatch: React.Dispatch<Action>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error('useAnalysisContext must be used within AnalysisProvider');
  return context;
}
