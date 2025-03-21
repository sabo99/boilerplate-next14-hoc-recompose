import { compose, withProps } from 'react-recompose';

import withIdlePopupOverlay from '../withIdlePopupOverlay';
import withLoadingOverlay from '../withLoadingOverlay';
import type { Options } from './withOverlay.types';

const withOverlay = (options: Options) => {
  const enhancers = [];

  enhancers.push(withProps(options));

  if (options.overlayState === 'IDLE') {
    enhancers.push(withIdlePopupOverlay());
  }

  if (options.overlayState === 'LOADING') {
    enhancers.push(withLoadingOverlay());
  }

  return compose(...enhancers);
};

export default withOverlay;