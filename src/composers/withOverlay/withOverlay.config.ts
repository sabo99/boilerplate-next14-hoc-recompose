import { withState } from 'react-recompose';
import { connect } from 'react-redux';

import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import { ReduxRootState } from '@/redux';
import { actions as idleOverlayActions } from '@/redux/reducers/IdleOverlay';
import { actions as loadingOverlayActions } from '@/redux/reducers/LoadingOverlay';

// using connector (React-Redux)
const mapStateToProps = (state: ReduxRootState) => ({
  isLoadingOverlay: state.loadingOverlay.isLoadingOverlay,
  idleOverlay: state.idleOverlay.isIdleOverlay
});
const mapDispatchToProps = {
  setLoadingOverlay: loadingOverlayActions.setLoadingOverlay,
  setIdleOverlay: idleOverlayActions.setIdleOverlay
};
const withConnectorOverlay = connect(mapStateToProps, mapDispatchToProps);

// using withState (react-recompose)
const stateOptions = [
  ['isLoadingOverlay', 'setLoadingOverlay', false],
  ['isIdleOverlay', 'setIdleOverlay', false],
  ['alertDialog', 'setAlertDialog', {}] as [string, string, AppAlertDialogOptions]
];
const withStateOverlay = stateOptions.map((stateOption) => withState(...(stateOption as [string, string, any])));

const Config = {
  withConnectorOverlay,
  withStateOverlay
};

export default Config;