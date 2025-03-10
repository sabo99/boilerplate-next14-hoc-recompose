import type { Options as OverlayOptions } from '../withOverlay/withOverlay.types';
import type { Options as PreventRefreshOptions } from '../withPreventRefresh/withPreventRefresh.types';
import type { Options as SidebarOptions } from '../withSidebar/withSidebar.types';

export type DefaultPropsOptions = {
  screenName: string;
  pageTitle: string;
  permissions: string[];
  isAuthenticatedPage?: boolean;
}

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
  handlers?: object | any;
  uiSettings?: UiSettingOptions;
}