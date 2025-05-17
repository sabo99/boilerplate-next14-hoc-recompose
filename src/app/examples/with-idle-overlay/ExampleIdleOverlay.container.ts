import withPage from '@/composers/withPage';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'ExampleIdleOverlay', // for unit testing
  pageTitle: 'Example with Idle Overlay',
  permissions: Permissions
};

export const uiSettings: UiSettingOptions = {
  sidebar: true,
  overlay: {
    overlayState: 'IDLE'
  }
};

export default withPage({
  props: defaultProps,
  uiSettings
})(ExampleIdleOverlay);