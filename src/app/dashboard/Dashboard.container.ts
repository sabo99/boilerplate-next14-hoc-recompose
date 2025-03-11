import withPage from '@/composers/withPage';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import Dashboard from './Dashboard.component';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'Dashboard', // for unit testing
  pageTitle: 'Dashboard',
  permissions: Permissions,
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
