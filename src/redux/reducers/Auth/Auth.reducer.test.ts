import reducer, { actions } from './Auth.reducer';

describe('authReducer', () => {
  const intialState = {
    sessionId: null,
    accessToken: null,
    refreshToken: null,
    userInfo: null
  };

  describe('#setSessionId', () => {
    it('should return sessionId when action is setSessionId.type', () => {
      const sessionId = 'sessionId';
      const action = { type: actions.setSessionId.type, payload: sessionId };
      const expectedResult = {
        ...intialState,
        sessionId
      };

      const result = reducer(intialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#setAccessToken', () => {
    it('should return accessToken when action is setAccessToken.type', () => {
      const accessToken = 'accessToken';
      const action = { type: actions.setAccessToken.type, payload: accessToken };
      const expectedResult = {
        ...intialState,
        accessToken
      };

      const result = reducer(intialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#setRefreshToken', () => {
    it('should return refreshToken when action is setRefreshToken.type', () => {
      const refreshToken = 'refreshToken';
      const action = { type: actions.setRefreshToken.type, payload: refreshToken };
      const expectedResult = {
        ...intialState,
        refreshToken
      };

      const result = reducer(intialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#setUserInfo', () => {
    it('should return userInfo when action is setUserInfo.type', () => {
      const userInfo = { email: 'mail@mail.com' };
      const action = { type: actions.setUserInfo.type, payload: userInfo };
      const expectedResult = {
        ...intialState,
        userInfo
      };

      const result = reducer(intialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});