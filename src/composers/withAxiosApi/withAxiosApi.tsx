import { AxiosError } from 'axios';
import { get } from 'lodash';
import React from 'react';
import { compose, withProps, withState } from 'react-recompose';

import Config from '@/config';
import AxiosClient from '@/services/AxiosClient';

import type { Options, Props } from './withAxiosApi.types';

const baseURL = get(Config.api, 'baseURL', '');

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

    const requestData = React.useCallback(
      async (payload = {}) => {
        const axiosOptions = {
          ...options,
          data: payload
        };

        setResponse((prev) => ({ ...prev, loading: true, data: null, error: null }));

        setLoadingOverlay(true);

        try {
          const result = await new AxiosClient(baseURL)
            .getInstance()
            .request({ url, method, ...axiosOptions });
          setResponse({ loading: false, data: result.data });
        } catch (err) {
          const axiosError = err as AxiosError;
          const errorMessage = get(axiosError.response, 'data.message', axiosError.message);
          const errorStatusCode = get(axiosError.response, 'data.status', axiosError.status);
          const errorCode = axiosError.code;

          const error = {
            message: errorMessage,
            statusCode: errorStatusCode,
            code: errorCode
          };
          setResponse({ loading: false, data: null, error });
        } finally {
          setLoadingOverlay(false);
        }

        return response;
      },
      [options, setResponse, setLoadingOverlay, url, method, response]
    );

    React.useEffect(() => {
      if (!skipApiOnRender) {
        requestData();
      }
    }, [skipApiOnRender]);

    const mappedProps = mapProps({
      request: { send: requestData, refetch: requestData },
      response
    });

    const computedProps = React.useMemo(
      () => mappedProps,
      [mappedProps]
    );

    return <ComposedComponent {...props} {...computedProps} />;
  };

  return AxiosApiHOC;
};

const withAxiosApi = (axiosApiOptions: Options) => compose(
  withState('response', 'setResponse', { loading: true, data: null, error: null }),
  withProps({
    skipApiOnRender: axiosApiOptions.options?.skipApiOnRender || axiosApiOptions.method !== 'GET'
  }),
  withProps(axiosApiOptions),
  ComposedAxiosApi
);

export default withAxiosApi;