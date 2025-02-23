import { Options as PreventRefreshOptions } from "../withPreventRefresh/withPreventRefresh.type";

export type StateOption = Array<[string, string, any]>

type ConnectOptions = {
  mapStateToProps?: any;
  mapDispatchToProps?: any;
}

export type Options = {
  connect?: ConnectOptions,
  state?: Array<StateOption>,
  props?: object,
  handlers?: object | any,
  preventRefresh?: PreventRefreshOptions,
  loadingOverlay?: boolean,
}