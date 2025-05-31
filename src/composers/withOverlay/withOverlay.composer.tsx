import { compose, withProps } from 'react-recompose';

import withIdlePopupOverlay from '@/composers/withIdlePopupOverlay';
import withLoadingOverlay from '@/composers/withLoadingOverlay';
import withStepUpVerificationOverlay from '@/composers/withStepUpVerificationOverlay';
import type { ComposedOverlayOptions } from '@/types';

const withOverlay = (options: ComposedOverlayOptions) => {
  const { overlayState } = options;
  const enhancers = [];

  enhancers.push(withProps(options));

  if (overlayState === 'IDLE') {
    enhancers.push(withIdlePopupOverlay());
  }

  if (overlayState === 'LOADING') {
    enhancers.push(withLoadingOverlay());
  }

  if (overlayState === 'STEP_UP_VERIFICATION') {
    enhancers.push(withStepUpVerificationOverlay(options));
  }

  return compose(...enhancers);
};

export default withOverlay;