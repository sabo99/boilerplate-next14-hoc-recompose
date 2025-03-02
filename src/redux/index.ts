import { useDispatch } from 'react-redux';

import { createStore } from './createStore';

export type ReduxRootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const enhanceStore = createStore;