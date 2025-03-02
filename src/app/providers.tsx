'use client';

import { Provider as ReduxProvider } from 'react-redux';

import { enhanceStore } from '@/redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={enhanceStore}>
      {children}
    </ReduxProvider>
  );
}
