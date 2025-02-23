import { ReduxRootState } from "@/redux/createStore";
import { actions as loadingOverlayActions } from '@/redux/reducers/LoadingOverlay';

const mapStateToProps = (state: ReduxRootState) => ({
  showLoadingOverlay: state.loadingOverlay.showLoadingOverlay
});

const mapDispatchToProps = {
  setShowLoadingOverlay: loadingOverlayActions.setShowLoadingOverlay
};

export const withLoadingOverlayConnector = {
  mapStateToProps, mapDispatchToProps
};