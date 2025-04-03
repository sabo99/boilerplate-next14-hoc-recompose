import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  accessToken: null,
  refreshToken: null,
  userInfo: null
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

export const actions = authenticationSlice.actions;
export default authenticationSlice.reducer;