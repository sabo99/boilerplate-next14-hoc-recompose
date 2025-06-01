import { compose, withProps, withState } from 'react-recompose';

import withStepUp from '@/composers/withStepUp';
import type { ComposedStepUpVerificationOverlayOptions } from '@/types';

const withStepUpVerificationOverlay = (options: ComposedStepUpVerificationOverlayOptions) => {
  const enhancers = [];

  enhancers.push(withProps(options));
  enhancers.push(withState('stepUpVerification', 'setStepUpVerification', { isOpen: false, type: null }));
  enhancers.push(withStepUp());

  return compose(...enhancers);
};

export default withStepUpVerificationOverlay;
