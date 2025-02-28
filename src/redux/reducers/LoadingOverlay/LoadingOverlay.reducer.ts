import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingOverlay: false
};

export const loadingOverlaySlice = createSlice({
  name: 'loadingOverlay',
  initialState,
  reducers: {
    setLoadingOverlay: (state, action) => ({
      ...state,
      isLoadingOverlay: action.payload
    })
  }
});

export const actions = loadingOverlaySlice.actions;
export default loadingOverlaySlice.reducer;
