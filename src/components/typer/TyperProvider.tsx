import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { TyperRequest } from './types';

interface TyperContextValue {
  openTyper: (request: TyperRequest) => void;
  closeTyper: () => void;
  request: TyperRequest | null;
}

const TyperContext = createContext<TyperContextValue | undefined>(undefined);

export function TyperProvider({ children }: PropsWithChildren) {
  const [request, setRequest] = useState<TyperRequest | null>(null);

  const openTyper = useCallback((config: TyperRequest) => setRequest(config), []);
  const closeTyper = useCallback(() => setRequest(null), []);
  const value: TyperContextValue = {openTyper, closeTyper, request};

  return <TyperContext.Provider value={value}>{children}</TyperContext.Provider>;
}

export function useTyper() {
  const context = useContext(TyperContext);
  if (!context) {
    throw new Error('TyperContext is undefined, make sure page is wrapped in TyperProvider');
  }
  return context;
}
