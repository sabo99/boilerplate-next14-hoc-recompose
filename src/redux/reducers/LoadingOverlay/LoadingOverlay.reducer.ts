import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoadingOverlay: false
};

export const loadingOverlaySlice = createSlice({
  name: "loadingOverlay",
  initialState,
  reducers: {
    setShowLoadingOverlay: (state, action) => ({
      ...state,
      showLoadingOverlay: action.payload
    })
  }
});

export const actions = loadingOverlaySlice.actions;
export default loadingOverlaySlice.reducer;
