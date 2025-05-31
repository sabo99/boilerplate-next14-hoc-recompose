import { createSlice } from '@reduxjs/toolkit';

import type { Account } from '@/types';

type StateType = {
  session: {
    isAuthenticated: boolean;
    sessionId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  },
  activeAccount: Account | null;
  accounts: Account[]
}

const initialState: StateType = {
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
      const newAccount = action.payload as Account;
      state.activeAccount = newAccount;

      const exists = state.accounts.some(
        (account: Account) => account.email === newAccount.email
      );

      if (!exists) {
        state.accounts.push(newAccount);
      }
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    clearSession: (state) => {
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