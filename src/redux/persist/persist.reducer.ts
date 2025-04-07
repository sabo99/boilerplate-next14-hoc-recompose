import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import { persistConfig } from '@/redux/persist/persist.config';
import rootReducer from '@/redux/reducers';

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const ignoredPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];