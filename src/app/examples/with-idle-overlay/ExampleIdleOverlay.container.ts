import withComposed from '@/composers/withComposed';
import { DefaultPropsOptions, UiSettingOptions } from '@/composers/withComposed/withComposed.types';
import Constants from '@/constants';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';
import type { Props } from './ExampleIdleOverlay.types';

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

export default withComposed<Props>({
  props: defaultProps,
  uiSettings
})(ExampleIdleOverlay);