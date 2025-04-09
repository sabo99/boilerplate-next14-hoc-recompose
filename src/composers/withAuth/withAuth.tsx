import { compose } from 'react-recompose';
import { connect } from 'react-redux';

import { ReduxRootState } from '@/redux';
import { actions as authActions } from '@/redux/reducers/Auth';

export const mapStateToProps = (state: ReduxRootState) => ({
  session: state.auth.session,
  activeAccount: state.auth.activeAccount,
  accounts: state.auth.accounts
});

export const mapDispatchToProps = {
  setSession: authActions.setSession,
  setActiveAccount: authActions.setActiveAccount,
  setAccounts: authActions.setAccounts,
  clearAuthSession: authActions.clearAuthSession,
  clearAllSession: authActions.clearAllSession
};

const withAuth = () => {
  return compose(connect(mapStateToProps, mapDispatchToProps));
};

export default withAuth;
