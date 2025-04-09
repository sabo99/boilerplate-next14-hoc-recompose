const enforceAuthConsistency = (state: any) => {
  if (!state) return state;

  const { session } = state;
  const { sessionId, accessToken, refreshToken } = session;
  const isAuthenticated = Boolean(sessionId && accessToken && refreshToken);

  return {
    ...state,
    session: {
      ...session,
      isAuthenticated
    }
  };
};

export const transformInboundAuth = enforceAuthConsistency;
export const transformOutboundAuth = enforceAuthConsistency;