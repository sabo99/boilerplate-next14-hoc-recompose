import { compose } from 'react-recompose';
import { connect } from 'react-redux';

import { ReduxRootState } from '@/redux';
import { actions as authActions } from '@/redux/reducers/Auth';

export const mapStateToProps = (state: ReduxRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sessionId: state.auth.sessionId,
  accessToken: state.auth.accessToken,
  refreshToken: state.auth.refreshToken,
  userInfo: state.auth.userInfo
});

export const mapDispatchToProps = {
  setAuthenticated: authActions.setAuthenticated,
  setSessionId: authActions.setSessionId,
  setAccessToken: authActions.setAccessToken,
  setRefreshToken: authActions.setRefreshToken,
  setUserInfo: authActions.setUserInfo,
  clearAuthState: authActions.clearAuthState
};

const withAuth = () => {
  return compose(connect(mapStateToProps, mapDispatchToProps));
};

export default withAuth;
