import { withState } from "react-recompose";
import { connect } from "react-redux";

import { ReduxRootState } from "@/redux/createStore";
import { actions as loadingOverlayActions } from '@/redux/reducers/LoadingOverlay';

const mapStateToProps = (state: ReduxRootState) => ({
  showLoadingOverlay: state.loadingOverlay.showLoadingOverlay
});
const mapDispatchToProps = {
  setShowLoadingOverlay: loadingOverlayActions.setShowLoadingOverlay
};

// using connector (React-Redux)
export const withConnectorLoadingOverlay = connect(mapStateToProps, mapDispatchToProps);

// using withState (react-recompose)
export const withStateLoadingOverlay = withState('showLoadingOverlay', 'setShowLoadingOverlay', false);
