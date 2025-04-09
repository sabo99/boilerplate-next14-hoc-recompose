import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: {
    isAuthenticated: false,
    sessionId: null,
    accessToken: null,
    refreshToken: null
  },
  activeAccount: null,
  accounts: []
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setActiveAccount: (state, action) => {
      state.activeAccount = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    clearAuthSession: (state) => {
      state.session = initialState.session;
      state.activeAccount = initialState.activeAccount;
    },
    clearAllSession: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const actions = authenticationSlice.actions;
export default authenticationSlice.reducer;