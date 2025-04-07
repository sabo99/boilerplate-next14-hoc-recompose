import { transformInboundAuth, transformOutboundAuth } from './authTransform';

describe('authTransform', () => {
  const sessionId = 'sessionId';
  const accessToken = 'accessToken';
  const refreshToken = 'refreshToken';
  const userInfo = {};

  describe('#transformInboundAuth', () => {
    it('should return isAuthenticated is true when all state is present', () => {
      const state = { sessionId, accessToken, refreshToken, userInfo };
      const expectedResult = {
        ...state,
        isAuthenticated: true
      };

      const result = transformInboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return isAuthenticated is false when some state is not present', () => {
      const state = { sessionId, accessToken: null, refreshToken, userInfo };
      const expectedResult = {
        ...state,
        isAuthenticated: false
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
    it('should return isAuthenticated is true when all state is present', () => {
      const state = { sessionId, accessToken, refreshToken, userInfo };
      const expectedResult = {
        ...state,
        isAuthenticated: true
      };

      const result = transformOutboundAuth(state);

      expect(result).toEqual(expectedResult);
    });

    it('should return isAuthenticated is false when some state is not present', () => {
      const state = { sessionId, accessToken: null, refreshToken, userInfo };
      const expectedResult = {
        ...state,
        isAuthenticated: false
      };

      const result = transformOutboundAuth(state);

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