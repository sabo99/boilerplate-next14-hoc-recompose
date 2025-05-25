import { compose } from 'react-recompose';

import withAxiosApi from '@/composers/withAxiosApi';
import withLoadingOverlay from '@/composers/withLoadingOverlay';
import withLoadingOverlayConfig from '@/composers/withLoadingOverlay/withLoadingOverlay.config';

import type { Options } from './withAxiosApiLifecycle.types';

const { withLoadingOverlayState } = withLoadingOverlayConfig;

const withAxiosApiLifecycle = (options: Options) => {
  const { apiOptions, loadingOverlay = true } = options;
  const enhancers = [];

  if (loadingOverlay) {
    enhancers.push(withLoadingOverlay());
  } else {
    enhancers.push(withLoadingOverlayState());
  }

  apiOptions.forEach((apiOption) => {
    enhancers.push(withAxiosApi(apiOption));
  });

  return compose(...enhancers);
};

export default withAxiosApiLifecycle;