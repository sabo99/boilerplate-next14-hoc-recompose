import withComposed from '@/composers/withComposed';
import { DefaultPropsOptions, StateOptions, UiSettingOptions } from '@/composers/withComposed/withComposed.types';
import Constants from '@/constants';

import ExampleLoadingOverlay from './ExampleLoadingOverlay.component';
import ExampleLoadingOverlayConfig from './ExampleLoadingOverlay.config';
import ExampleLoadingOverlayHandlers from './ExampleLoadingOverlay.handlers';
import type { Props } from './ExampleLoadingOverlay.types';

const { Permissions } = Constants;
const { screenName } = ExampleLoadingOverlayConfig;

export const defaultProps: DefaultPropsOptions = {
  screenName, // for unit testing
  pageTitle: 'Example with Loading Overlay',
  permissions: Permissions
};

export const stateList: StateOptions = [
  ['messages', 'setMessages', ['default message...']],
  ['progress', 'setProgress', 0]
];

export const uiSettings: UiSettingOptions = {
  sidebar: true,
  overlay: {
    overlayState: 'LOADING',
    loaderType: 'DOTS'
  }
};

export default withComposed<Props>({
  props: {
    ...defaultProps
    // add another props
    // ...
  },
  state: stateList,
  handlers: ExampleLoadingOverlayHandlers,
  uiSettings
})(ExampleLoadingOverlay);
