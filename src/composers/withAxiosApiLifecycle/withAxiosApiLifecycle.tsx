import { compose } from 'react-recompose';

import withAxiosApi from '../withAxiosApi';
import withLoadingOverlay from '../withLoadingOverlay';
import type { Options } from './withAxiosApiLifecycle.types';

const withAxiosApiLifecycle = (options: Options) => {
  const { apiOptions } = options;
  const enhancers = [];

  enhancers.push(withLoadingOverlay());

  apiOptions.forEach((apiOption) => {
    enhancers.push(withAxiosApi(apiOption));
  });

  return compose(...enhancers);
};

export default withAxiosApiLifecycle;