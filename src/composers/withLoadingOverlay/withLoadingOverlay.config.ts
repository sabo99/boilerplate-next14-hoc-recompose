import { withState } from 'react-recompose';
import { connect } from 'react-redux';

import { ReduxRootState } from '@/redux';
import { actions as loadingOverlayActions } from '@/redux/reducers/LoadingOverlay';

// using connector (React-Redux)
const mapStateToProps = (state: ReduxRootState) => ({
  isLoadingOverlay: state.loadingOverlay.isLoadingOverlay
});
const mapDispatchToProps = {
  setLoadingOverlay: loadingOverlayActions.setLoadingOverlay
};
const withConnectorLoadingOverlay = connect(mapStateToProps, mapDispatchToProps);

// using withState (react-recompose)
const stateOptions = [
  ['isLoadingOverlay', 'setLoadingOverlay', false]
];
const withStateLoadingOverlay = stateOptions.map((stateOption) => withState(...(stateOption as [string, string, any])));

const Config = {
  withConnectorLoadingOverlay,
  withStateLoadingOverlay
};

export default Config;