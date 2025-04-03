import { useDispatch } from 'react-redux';

import { createStore } from './createStore';

export type ReduxRootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const enhanceStore = createStore;