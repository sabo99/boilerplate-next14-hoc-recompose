import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isIdleOverlay: false
};

export const idleOverlaySlice = createSlice({
  name: 'idleOverlay',
  initialState,
  reducers: {
    setIdleOverlay: (state, action) => {
      state.isIdleOverlay = action.payload;
    }
  }
});

export const actions = idleOverlaySlice.actions;
export default idleOverlaySlice.reducer;
