import { AxiosError } from 'axios';
import { get } from 'lodash';
import React from 'react';

import Config from '@/config';
import AxiosClient from '@/services/AxiosClient';
import type {
  AxiosApiOptions,
  AxiosApiRequestArgs,
  AxiosApiResponse,
  RequestMethod
} from '@/types';

type UseApiRequestParams = {
  baseURL?: string;
  url: string;
  method: RequestMethod;
  options?: AxiosApiOptions;
  setResponse: React.Dispatch<React.SetStateAction<AxiosApiResponse>>;
};

/**
 * Custom React hook for making API requests using Axios.
 *
 * This hook returns a memoized async function that sends an HTTP request with the specified configuration,
 * manages loading and response state, and handles errors in a standardized way.
 *
 * @param params - The parameters for configuring the API request.
 * @param params.baseURL - Optional base URL for the Axios client. If not provided, uses the default from config.
 * @param params.url - The endpoint URL for the API request.
 * @param params.method - The HTTP method to use (e.g., 'GET', 'POST').
 * @param params.options - Optional default Axios request options.
 * @param params.setResponse - Callback to update the response state.
 * @param params.setLoading - Callback to update the loading state.
 *
 * @returns A memoized async function that sends an API request.
 * The function accepts an optional parameter object:
 *   - payload: The request payload (for POST, PUT, PATCH, etc.).
 *   - apiOptions: Additional Axios request options for this call.
 * The function returns a promise that resolves to an object containing:
 *   - loading: Whether the request is in progress.
 *   - data: The response data, if successful.
 *   - error: Error information, if the request fails.
 *
 * @example
 * const apiRequest = useApiRequest({ url: '/users', method: 'GET', setResponse, setLoading });
 * const response = await apiRequest();
 */
export const useApiRequest = (params: UseApiRequestParams) => {
  const {
    baseURL,
    url,
    method,
    options,
    setResponse
  } = params;
  const defaultBaseURL = get(Config.api, 'baseURL', '');
  const BASE_URL = baseURL || defaultBaseURL;

  const axiosClientInstance = new AxiosClient(BASE_URL).getInstance();

  return React.useCallback(
    async (args?: AxiosApiRequestArgs): Promise<AxiosApiResponse> => {
      const { payload = {}, apiOptions = {} } = args || {};
      const axiosOptions = {
        ...options,
        ...apiOptions
      };

      let axiosApiResponse: AxiosApiResponse = {
        loading: false,
        data: null,
        error: null
      };

      try {
        const result = await axiosClientInstance.request({
          url,
          method,
          data: payload,
          ...axiosOptions
        });

        axiosApiResponse = {
          loading: false,
          data: result.data,
          error: null
        };
      } catch (error) {
        const axiosError = error as AxiosError;

        const errorData = {
          message: get(axiosError.response, 'data.message', axiosError.message),
          statusCode: get(axiosError.response, 'data.status', axiosError.status),
          code: axiosError.code?.replace('ERR_', '')
        };

        axiosApiResponse = {
          loading: false,
          data: null,
          error: errorData
        };
      } finally {
        setResponse(axiosApiResponse);
      }

      return axiosApiResponse;
    },
    [axiosClientInstance, method, options, url, setResponse]
  );
};