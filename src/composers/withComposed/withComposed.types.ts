import type { Options as ApiOptions } from '@/composers/withAxiosApi/withAxiosApi.types';
import type { Options as OverlayOptions } from '@/composers/withOverlay/withOverlay.types';
import type { Options as PreventRefreshOptions } from '@/composers/withPreventRefresh/withPreventRefresh.types';

export type DefaultPropsOptions = {
  screenName: string;
  pageTitle: string;
  permissions: string[];
  params?: object;
  searchParams?: object;
};

export type ConnectOptions = {
  mapStateToProps?: any;
  mapDispatchToProps?: any;
}

export type StateOptions = [string, string, any][]

export type UiSettingOptions = {
  sidebar?: boolean;
  overlay?: OverlayOptions;
  preventRefresh?: PreventRefreshOptions;
}

export type Options = {
  withAuthEnabled?: boolean;
  props?: DefaultPropsOptions | object;
  connect?: ConnectOptions;
  state?: StateOptions[];
  api?: ApiOptions[];
  handlers?: object | any;
  uiSettings?: UiSettingOptions;
}