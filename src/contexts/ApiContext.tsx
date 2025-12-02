/**
 * API Context
 * Manages API mode toggling (mock/real/hybrid)
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { config } from '../config/env';

export type ApiMode = 'mock' | 'real' | 'hybrid';

interface ApiContextType {
  mode: ApiMode;
  setMode: (mode: ApiMode) => void;
  isUsingMock: boolean;
  isUsingReal: boolean;
  isUsingHybrid: boolean;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [mode, setMode] = useState<ApiMode>(config.api.mode);

  const value: ApiContextType = {
    mode,
    setMode,
    isUsingMock: mode === 'mock',
    isUsingReal: mode === 'real',
    isUsingHybrid: mode === 'hybrid',
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApiMode = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiMode must be used within ApiProvider');
  }
  return context;
};
