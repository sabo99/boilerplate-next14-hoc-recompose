import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  sessionId: null,
  accessToken: null,
  refreshToken: null,
  userInfo: null
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
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
    },
    clearAuthState: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const actions = authenticationSlice.actions;
export default authenticationSlice.reducer;