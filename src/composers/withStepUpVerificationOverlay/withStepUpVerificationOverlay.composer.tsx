import { compose, withProps, withState } from 'react-recompose';

import withStepUpPassword from '@/composers/withStepUpPassword';
import type { ComposedStepUpVerificationOptions } from '@/types';

const withStepUpVerification = (options: ComposedStepUpVerificationOptions) => {
  const enhancers = [];

  enhancers.push(withProps(options));
  enhancers.push(withState('stepUpVerification', 'setStepUpVerification', { isOpen: false, type: null }));
  enhancers.push(withStepUpPassword());

  return compose(...enhancers);
};

export default withStepUpVerification;
