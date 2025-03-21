import { withState } from 'react-recompose';
import { connect } from 'react-redux';

import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import { ReduxRootState } from '@/redux';
import { actions as idleOverlayActions } from '@/redux/reducers/IdleOverlay';

// using connector (React-Redux)
const mapStateToProps = (state: ReduxRootState) => ({
  isIdleOverlay: state.idleOverlay.isIdleOverlay
});
const mapDispatchToProps = {
  setIdleOverlay: idleOverlayActions.setIdleOverlay
};
const withConnectorIdlePopupOverlay = connect(mapStateToProps, mapDispatchToProps);

// using withState (react-recompose)
const stateOptions = [
  ['isIdle', 'setIdle', false],
  ['isIdleOverlay', 'setIdleOverlay', false],
  ['appAlertDialogOptions', 'setAppAlertDialogOptions', {}] as [string, string, AppAlertDialogOptions]
];
const withStateIdlePopupOverlay = stateOptions.map(
  (stateOption) => withState(...(stateOption as [string, string, any]))
);

const Config = {
  withConnectorIdlePopupOverlay,
  withStateIdlePopupOverlay
};

export default Config;