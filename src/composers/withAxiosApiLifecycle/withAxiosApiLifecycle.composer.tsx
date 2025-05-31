import { compose } from 'react-recompose';

import withAxiosApi from '@/composers/withAxiosApi';
import withLoadingOverlay from '@/composers/withLoadingOverlay';
import type { ComposedAxiosApiLifecycleOptions } from '@/types';

const withAxiosApiLifecycle = (options: ComposedAxiosApiLifecycleOptions) => {
  const { apiRequests, loadingOverlay } = options;
  const enhancers = [];

  if (loadingOverlay) {
    enhancers.push(withLoadingOverlay());
  }

  apiRequests.forEach((apiRequest) => {
    enhancers.push(withAxiosApi(apiRequest));
  });

  return compose(...enhancers);
};

export default withAxiosApiLifecycle;