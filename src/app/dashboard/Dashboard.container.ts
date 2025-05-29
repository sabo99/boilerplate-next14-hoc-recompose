import withComposed from '@/composers/withComposed';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withComposed/withComposed.types';
import Constants from '@/constants';

import Dashboard from './Dashboard.component';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'Dashboard', // for unit testing
  pageTitle: 'Dashboard',
  permissions: Permissions
};

export const uiSettings: UiSettingOptions = {
  sidebar: true
};

export default withComposed({
  props: defaultProps,
  uiSettings
})(Dashboard);
