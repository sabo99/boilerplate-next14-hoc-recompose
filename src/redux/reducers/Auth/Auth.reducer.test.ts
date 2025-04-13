import reducer, { actions } from './Auth.reducer';

describe('authReducer', () => {
  const initialState = {
    session: {
      isAuthenticated: false,
      sessionId: null,
      accessToken: null,
      refreshToken: null
    },
    activeAccount: null,
    accounts: []
  };

  describe('#setSession', () => {
    it('should return session when action is setSession.type', () => {
      const session = {
        isAuthenticated: true,
        sessionId: 'sessionId',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      };
      const action = { type: actions.setSession.type, payload: session };
      const expectedResult = {
        ...initialState,
        session
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#setActiveAccount', () => {
    it('should return activeAccount when action is setActiveAccount.type', () => {
      const activeAccount = { email: 'mail@mail.com' };
      const action = { type: actions.setActiveAccount.type, payload: activeAccount };
      const expectedResult = {
        ...initialState,
        activeAccount,
        accounts: [activeAccount]
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#setAccounts', () => {
    it('should return accounts when action is setAccounts.type', () => {
      const accounts = [{ email: 'mail.01@mail.com' }, { email: 'mail.02@mail.com' }];
      const action = { type: actions.setAccounts.type, payload: accounts };
      const expectedResult = {
        ...initialState,
        accounts
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#clearSession', () => {
    it('should return session and activeAccount initialState when action is clearSession.type', () => {
      const action = { type: actions.clearSession.type };
      const expectedResult = {
        ...initialState,
        session: initialState.session,
        activeAccount: initialState.activeAccount
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('#clearAllSession', () => {
    it('should return initialState when action is clearAllSession.type', () => {
      const action = { type: actions.clearAllSession.type };
      const expectedResult = initialState;

      const result = reducer(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});