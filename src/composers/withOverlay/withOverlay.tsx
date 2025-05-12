import { compose, withProps, withState } from 'react-recompose';

import withIdlePopupOverlay from '../withIdlePopupOverlay';
import withLoadingOverlay from '../withLoadingOverlay';
import withStepUpVerificationOverlay from '../withStepUpVerificationOverlay';
import type { Options } from './withOverlay.types';

const withOverlay = (options: Options) => {
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
    const defaultValue = { isOpen: false, type: null };
    enhancers.push(withState('stepUpVerification', 'setStepUpVerification', defaultValue));
    enhancers.push(withStepUpVerificationOverlay(options));
  }

  return compose(...enhancers);
};

export default withOverlay;