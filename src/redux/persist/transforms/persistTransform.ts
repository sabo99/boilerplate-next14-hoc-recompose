import { createTransform } from 'redux-persist';

import { transformInboundAuth, transformOutboundAuth } from './stateTransform/authTransform';

export const createPersistTransform = (whitelist: string[]) => createTransform(
  (state, key) => {
    switch (key) {
      case 'auth':
        return transformInboundAuth(state);
      default:
        return state;
    }
  },
  (state, key) => {
    switch (key) {
      case 'auth':
        return transformOutboundAuth(state);
      default:
        return state;
    }
  },
  { whitelist }
);