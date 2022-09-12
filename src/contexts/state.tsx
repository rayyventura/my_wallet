import { createContext, useContext, useMemo, useState } from 'react';
import React, { ReactNode } from 'react';

interface AuxProps {
  children: ReactNode;
}

interface AuthData {
  token: string;
  userName: string;
}

const AppContext = createContext<any>({});

export function AppWrapper({ children }: AuxProps) {
  const [auth, setAuth] = useState({});
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const persistedAuth = JSON.parse(localStorage.getItem('auth')!);
      setAuth(persistedAuth);
    }
  }, []);

  function signin(authData: AuthData) {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  }

  return (
    <AppContext.Provider value={{ auth, signin, setAuth }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
