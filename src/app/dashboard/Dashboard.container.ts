import withPage from '@/composers/withPage';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';

import Dashboard from './Dashboard.component';

export const defaultProps: DefaultPropsOptions = {
  screenName: 'Dashboard', // for unit testing
  pageTitle: 'Dashboard',
  permissions: ['VIEW_LOADING_OVERLAY'],
  isAuthenticatedPage: true
};

export const uiSettings: UiSettingOptions = {
  sidebar: {
    isFilteredByPermission: true
  }
};

export default withPage({
  props: defaultProps,
  uiSettings
})(Dashboard);
