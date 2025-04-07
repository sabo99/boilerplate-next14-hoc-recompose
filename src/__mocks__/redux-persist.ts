export const persistReducer = (_config: any, reducer: any) => reducer;

export const persistStore = () => ({
  subscribe: jest.fn(),
  getState: jest.fn(() => ({})),
  dispatch: jest.fn(),
  purge: jest.fn(),
  flush: jest.fn(),
  pause: jest.fn(),
  persist: jest.fn()
});

export const createTransform = (
  inbound: any,
  outbound: any,
  config?: any
) => ({
  in: inbound || ((state: any) => state),
  out: outbound || ((state: any) => state),
  ...config
});

export const FLUSH = 'FLUSH';
export const REHYDRATE = 'REHYDRATE';
export const PAUSE = 'PAUSE';
export const PERSIST = 'PERSIST';
export const PURGE = 'PURGE';
export const REGISTER = 'REGISTER';