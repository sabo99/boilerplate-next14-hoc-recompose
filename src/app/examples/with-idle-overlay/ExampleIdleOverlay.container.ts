import withPage from '@/composers/withPage';
import { DefaultPropsOptions, StateOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';
import ExampleIdleOverlayHandlers from './ExampleIdleOverlay.handlers';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'ExampleIdleOverlay', // for unit testing
  pageTitle: 'Example with Idle Overlay',
  permissions: Permissions,
  isAuthenticatedPage: true
};

export const stateList: StateOptions = [
  ['countdown', 'setCountdown', 5]
];

export const uiSettings: UiSettingOptions = {
  sidebar: {
    isFilteredByPermission: true
  },
  overlay: {
    overlayState: 'IDLE',
    idleTimeout: 5000
  }
};

export default withPage({
  props: defaultProps,
  state: stateList,
  handlers: ExampleIdleOverlayHandlers,
  uiSettings
})(ExampleIdleOverlay);