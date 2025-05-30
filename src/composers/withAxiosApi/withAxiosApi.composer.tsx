import React from 'react';
import { compose, withProps, withState } from 'react-recompose';

import { useApiRequest } from '@/hooks';
import { ComposedAxiosApiOptions } from '@/types';

import type { Props } from './withAxiosApi.types';

const ComposedAxiosApi = (ComposedComponent: React.ComponentType<Props>) => {
  const AxiosApiHOC: React.FC<Props> = (props) => {
    const {
      response,
      setResponse,
      skipApiOnRender,
      url,
      method = 'GET',
      mapProps,
      options = {},
      setLoadingOverlay
    } = props;

    const sendRequest = useApiRequest({
      url,
      method,
      options,
      setResponse,
      setLoading: setLoadingOverlay
    });

    React.useEffect(() => {
      if (!skipApiOnRender) {
        sendRequest();
      }
    }, [skipApiOnRender, sendRequest]);

    const computedProps = mapProps({
      request: { send: sendRequest },
      response
    });

    return <ComposedComponent {...props} {...computedProps} />;
  };

  return AxiosApiHOC;
};

const withAxiosApi = (withAxiosApiOptions: ComposedAxiosApiOptions) => compose(
  withState('response', 'setResponse', {
    loading: true,
    data: null,
    error: null
  }),
  withProps({
    skipApiOnRender:
      withAxiosApiOptions.options?.skipApiOnRender ||
      withAxiosApiOptions.method !== 'GET'
  }),
  withProps(withAxiosApiOptions),
  ComposedAxiosApi
);

export default withAxiosApi;