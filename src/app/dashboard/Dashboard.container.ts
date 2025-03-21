import withPage from '@/composers/withPage';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import Dashboard from './Dashboard.component';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'Dashboard', // for unit testing
  pageTitle: 'Dashboard',
  permissions: Permissions
};

export const uiSettings: UiSettingOptions = {
  sidebar: {
    isAuthenticated: true
  }
};

export default withPage({
  props: defaultProps,
  uiSettings
})(Dashboard);
