import { createSlice } from '@reduxjs/toolkit';

import type { Account } from '@/types';

type StateType = {
  selectedRelogAccount: Account | null;
}

const initialState: StateType = {
  selectedRelogAccount: null
};

const reloginSlice = createSlice({
  name: 'relogin',
  initialState,
  reducers: {
    setSelectedRelogAccount: (state, action) => {
      state.selectedRelogAccount = action.payload;
    },
    clearSelectedRelogAccount: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const actions = reloginSlice.actions;
export default reloginSlice.reducer;