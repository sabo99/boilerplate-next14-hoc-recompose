import { AxiosInstance } from 'axios';
import { get } from 'lodash';
import React from 'react';
import { compose, withProps, withState } from 'react-recompose';

import Config from '@/config';
import { createSendRequest } from '@/lib/utils';
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

    const axiosClientInstance = React.useRef<AxiosInstance>(
      new AxiosClient(baseURL).getInstance()
    );

    const sendRequest = React.useCallback(() => {
      return createSendRequest({
        axiosClientInstance: axiosClientInstance.current,
        url,
        method,
        options,
        setResponse,
        setLoadingOverlay
      })();
    }, [setLoadingOverlay, url, method, options, setResponse]);

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

const withAxiosApi = (axiosApiOptions: Options) => compose(
  withState('response', 'setResponse', {
    loading: true,
    data: null,
    error: null
  }),
  withProps({
    skipApiOnRender:
      axiosApiOptions.options?.skipApiOnRender ||
      axiosApiOptions.method !== 'GET'
  }),
  withProps(axiosApiOptions),
  ComposedAxiosApi
);

export default withAxiosApi;