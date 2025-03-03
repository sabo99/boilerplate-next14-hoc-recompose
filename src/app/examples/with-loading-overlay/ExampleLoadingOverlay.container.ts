import withPage from '@/composers/withPage';
import { DefaultPropsOptions, StateOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';

import ExampleLoadingOverlay from './ExampleLoadingOverlay.component';
import ExampleLoadingOverlayHandlers from './ExampleLoadingOverlay.handlers';

export const defaultProps: DefaultPropsOptions = {
  screenName: 'ExampleLoadingOverlay', // for unit testing
  pageTitle: 'Example with Loading Overlay',
  permissions: ['VIEW_LOADING_OVERLAY'],
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
