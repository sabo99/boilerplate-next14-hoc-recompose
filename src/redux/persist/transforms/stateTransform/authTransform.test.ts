import { transformInboundAuth, transformOutboundAuth } from './authTransform';

describe('authTransform', () => {
  const sessionId = 'sessionId';
  const accessToken = 'accessToken';
  const refreshToken = 'refreshToken';
  const session = {
    sessionId, accessToken, refreshToken
  };
  const activeAccount = {};
  const accounts: any = [];

  describe('#transformInboundAuth', () => {
    it('should return isAuthenticated is true when session state is present', () => {
      const state = { session, activeAccount, accounts };
      const expectedResult = {
        ...state,
        session: {
          ...state.session,
          isAuthenticated: true
        }
      };

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return isAuthenticated is false when some session state is not present', () => {
      const state = { session: { ...session, sessionId: null }, activeAccount, accounts };
      const expectedResult = {
        ...state,
        session: {
          ...state.session,
          isAuthenticated: false
        }
      };

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return null state when state is null', () => {
      const state = null;
      const expectedResult = state;

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

  });

  describe('#transformOutboundAuth', () => {
    it('should return isAuthenticated is true when session state is present', () => {
      const state = { session, activeAccount, accounts };
      const expectedResult = {
        ...state,
        session: {
          ...state.session,
          isAuthenticated: true
        }
      };

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return isAuthenticated is false when some session state is not present', () => {
      const state = { session: { ...session, sessionId: null }, activeAccount, accounts };
      const expectedResult = {
        ...state,
        session: {
          ...state.session,
          isAuthenticated: false
        }
      };

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return null state when state is null', () => {
      const state = null;
      const expectedResult = state;

      const result = transformOutboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

  });

});