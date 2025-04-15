import { compose } from 'react-recompose';
import { connect } from 'react-redux';

import { ReduxRootState } from '@/redux';
import { actions as authActions } from '@/redux/reducers/Auth';
import { actions as relogActions } from '@/redux/reducers/Relogin';

export const mapStateToProps = (state: ReduxRootState) => ({
  session: state.auth.session,
  activeAccount: state.auth.activeAccount,
  accounts: state.auth.accounts,
  selectedRelogAccount: state.relogin.selectedRelogAccount
});

export const mapDispatchToProps = {
  setSession: authActions.setSession,
  setActiveAccount: authActions.setActiveAccount,
  setAccounts: authActions.setAccounts,
  clearSession: authActions.clearSession,
  clearAllSession: authActions.clearAllSession,
  setSelectedRelogAccount: relogActions.setSelectedRelogAccount,
  clearSelectedRelogAccount: relogActions.clearSelectedRelogAccount
};

const withAuth = () => {
  return compose(connect(mapStateToProps, mapDispatchToProps));
};

export default withAuth;
