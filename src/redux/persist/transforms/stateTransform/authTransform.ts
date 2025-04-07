const enforceAuthConsistency = (state: any) => {
  if (!state) return state;

  const { sessionId, accessToken, refreshToken, userInfo } = state;
  const isAuthenticated = Boolean(
    sessionId && accessToken && refreshToken && userInfo
  );

  return {
    ...state,
    isAuthenticated
  };
};

export const transformInboundAuth = enforceAuthConsistency;
export const transformOutboundAuth = enforceAuthConsistency;