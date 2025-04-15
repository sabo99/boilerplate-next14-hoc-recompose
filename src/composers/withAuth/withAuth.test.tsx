import { compose } from 'react-recompose';
import { connect } from 'react-redux';

import { actions as authActions } from '@/redux/reducers/Auth';
import { actions as relogActions } from '@/redux/reducers/Relogin';

import withAuth, { mapDispatchToProps, mapStateToProps } from './withAuth';

jest.mock('react-recompose')
  .mock('react-redux');

describe('withAuth', () => {
  const composeCallback = jest.fn();
  const composeResult = {};
  const account = { name: 'JohnDoe', email: 'email@mail.com' };

  beforeEach(() => {
    composeCallback.mockReturnValue(composeResult);
    (compose as jest.Mock).mockReturnValue(composeCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#connect', () => {
    it('should map Redux state to props correctly', () => {
      const state = {
        auth: {
          session: {
            isAuthenticated: true,
            sessionId: '123',
            accessToken: 'access-token',
            refreshToken: 'refresh-token'
          },
          activeAccount: account,
          accounts: [account]
        },
        relogin: {
          selectedRelogAccount: account
        }
      };

      const props = mapStateToProps(state as any);

      expect(props).toEqual({ ...state.auth, ...state.relogin });
    });

    it('should map dispatch to props correctly', () => {
      const actions = {
        setSession: authActions.setSession,
        setActiveAccount: authActions.setActiveAccount,
        setAccounts: authActions.setAccounts,
        clearSession: authActions.clearSession,
        clearAllSession: authActions.clearAllSession,
        setSelectedRelogAccount: relogActions.setSelectedRelogAccount,
        clearSelectedRelogAccount: relogActions.clearSelectedRelogAccount
      };

      expect(mapDispatchToProps).toEqual(actions);
    });

    it('should call connect from react-redux', () => {
      withAuth();

      expect(connect).toHaveBeenCalled();
    });
  });
});