import type { Options as LoadingOverlayOptions } from '../withLoadingOverlay/withLoadingOverlay.types';
import type { Options as PreventRefreshOptions } from '../withPreventRefresh/withPreventRefresh.types';

export type StateOption = Array<[string, string, any]>

type ConnectOptions = {
  mapStateToProps?: any;
  mapDispatchToProps?: any;
}

type UiSettingOptions = {
  loadingOverlay?: LoadingOverlayOptions;
  preventRefresh?: PreventRefreshOptions;
}

export type Options = {
  props?: object;
  connect?: ConnectOptions;
  state?: Array<StateOption>;
  handlers?: object | any;
  uiSettings?: UiSettingOptions;
}