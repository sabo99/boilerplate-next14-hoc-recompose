'use client';

import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/redux/createStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
}
