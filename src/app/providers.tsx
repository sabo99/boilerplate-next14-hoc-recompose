'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = React.useState(false);

  // Wait for client-side mount to avoid SSR issues with localStorage
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor as any}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}
