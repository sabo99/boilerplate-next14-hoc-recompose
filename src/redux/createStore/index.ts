// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

import rootReducer from "../reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type ReduxRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
