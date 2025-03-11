import withPage from '@/composers/withPage';
import { DefaultPropsOptions, StateOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import ExampleLoadingOverlay from './ExampleLoadingOverlay.component';
import ExampleLoadingOverlayConfig from './ExampleLoadingOverlay.config';
import ExampleLoadingOverlayHandlers from './ExampleLoadingOverlay.handlers';

const { Permissions } = Constants;
const { screenName } = ExampleLoadingOverlayConfig;

export const defaultProps: DefaultPropsOptions = {
  screenName, // for unit testing
  pageTitle: 'Example with Loading Overlay',
  permissions: Permissions,
  isAuthenticatedPage: true
};

export const stateList: StateOptions = [
  ['messages', 'setMessages', ['default message...']],
  ['progress', 'setProgress', 0]
];

export const uiSettings: UiSettingOptions = {
  sidebar: {
    isFilteredByPermission: true
  },
  overlay: {
    overlayState : 'LOADING',
    loaderType: 'DOTS'
  }
};

export default withPage({
  props: {
    ...defaultProps
    // add another props
    // ...
  },
  state: stateList,
  handlers: ExampleLoadingOverlayHandlers,
  uiSettings
})(ExampleLoadingOverlay);
