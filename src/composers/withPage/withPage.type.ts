import { Options as PreventRefreshOptions } from "../withPreventRefresh/withPreventRefresh.type";

export type Options = {
  connect?: object,
  props?: object,
  handlers?: object | any,
  preventRefresh?: PreventRefreshOptions,
  loadingOverlay?: boolean,
}