import withComposed from '@/composers/withComposed';
import Constants from '@/constants';
import type { ComposedDefaultPropsOptions, ComposedUiSettingOptions } from '@/types';

import ExampleStepUpVerification from './ExampleStepUpVerification.component';
import type { Props } from './ExampleStepUpVerification.types';

const { Permissions } = Constants;

export const defaultProps: ComposedDefaultPropsOptions = {
  screenName: 'ExampleStepUpVerification', // for unit testing
  pageTitle: 'Example with Step Up Verification',
  permissions: Permissions
};

export const uiSettings: ComposedUiSettingOptions = {
  sidebar: true,
  overlay: {
    overlayState: 'STEP_UP_VERIFICATION'
  }
};

export default withComposed<Props>({
  props: defaultProps,
  uiSettings
})(ExampleStepUpVerification);

