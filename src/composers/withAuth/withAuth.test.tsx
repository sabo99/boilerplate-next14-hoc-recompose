import { compose } from 'react-recompose';
import { connect } from 'react-redux';

import { actions as authActions } from '@/redux/reducers/Auth';

import withAuth, { mapDispatchToProps, mapStateToProps } from './withAuth';

jest.mock('react-recompose')
  .mock('react-redux');

describe('withAuth', () => {
  const composeCallback = jest.fn();
  const composeResult = {};

  beforeEach(() => {
    composeCallback.mockReturnValue(composeResult);
    (compose as jest.Mock).mockReturnValue(composeCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#connect', () => {
    it('should map Redux state to props correctly', () => {
      const mockState = {
        auth: {
          isAuthenticated: true,
          sessionId: '123',
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
          userInfo: { name: 'JohnDoe', email: 'email@mail.com' }
        }
      };

      const props = mapStateToProps(mockState as any);

      expect(props).toEqual(mockState.auth);
    });

    it('should map dispatch to props correctly', () => {
      const actions = {
        setAuthenticated: authActions.setAuthenticated,
        setSessionId: authActions.setSessionId,
        setAccessToken: authActions.setAccessToken,
        setRefreshToken: authActions.setRefreshToken,
        setUserInfo: authActions.setUserInfo,
        clearAuthState: authActions.clearAuthState
      };

      expect(mapDispatchToProps).toEqual(actions);
    });

    it('should call connect from react-redux', () => {
      withAuth();

      expect(connect).toHaveBeenCalled();
    });
  });
});