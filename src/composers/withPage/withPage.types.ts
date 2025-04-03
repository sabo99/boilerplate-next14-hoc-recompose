import type { Options as ApiOptions } from '../withAxiosApi/withAxiosApi.types';
import type { Options as OverlayOptions } from '../withOverlay/withOverlay.types';
import type { Options as PreventRefreshOptions } from '../withPreventRefresh/withPreventRefresh.types';
import type { Options as SidebarOptions } from '../withSidebar/withSidebar.types';

export type DefaultPropsOptions =  {
  params?: object;
  searchParams?: object;
  screenName: string;
  pageTitle: string;
  permissions: string[];
};

export type ConnectOptions = {
  mapStateToProps?: any;
  mapDispatchToProps?: any;
}

export type StateOptions = [string, string, any][]

export type UiSettingOptions = {
  sidebar?: SidebarOptions;
  overlay?: OverlayOptions;
  preventRefresh?: PreventRefreshOptions;
}

export type Options = {
  props?: DefaultPropsOptions & object;
  connect?: ConnectOptions;
  state?: StateOptions[];
  api?: ApiOptions[];
  handlers?: object | any;
  uiSettings?: UiSettingOptions;
}