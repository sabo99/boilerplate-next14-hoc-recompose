import { AxiosError, AxiosInstance } from 'axios';
import { get } from 'lodash';

import type { AxiosApiResponse } from '@/composers/withAxiosApi/withAxiosApi.types';

type CreateSendRequestParams = {
  axiosClientInstance: AxiosInstance;
  url: string;
  method: string;
  options?: object;
  setResponse: React.Dispatch<React.SetStateAction<AxiosApiResponse>>;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

type SendRequestCallback = (payload?: object) => Promise<AxiosApiResponse>;

/**
 * Creates a function to send HTTP requests using a provided Axios client instance.
 *
 * @param {Object} params - The parameters for creating the request function.
 * @param {AxiosInstance} params.axiosClientInstance - The Axios client instance to use for making requests.
 * @param {string} params.url - The URL endpoint for the request.
 * @param {Method} params.method - The HTTP method (e.g., 'GET', 'POST', etc.) for the request.
 * @param {object} [params.options={}] - Additional Axios request configuration options.
 * @param {(response: AxiosApiResponse) => void} params.setResponse - A callback function to handle the response.
 * @param {(isLoading: boolean) => void} params.setLoadingOverlay - A callback function to toggle the loading overlay.
 *
 * @returns {(payload?: object) => Promise<AxiosApiResponse>} - A function that sends the request with the given payload
 * and returns a promise resolving to the response.
 */
export const createSendRequest = (params: CreateSendRequestParams): SendRequestCallback => {
  const {
    axiosClientInstance,
    url,
    method,
    options = {},
    setResponse,
    setLoadingOverlay
  } = params;

  return async (payload = {}): Promise<AxiosApiResponse> => {
    let axiosApiResponse: AxiosApiResponse;

    setLoadingOverlay(true);

    try {
      const result = await axiosClientInstance.request({
        url,
        method,
        data: payload,
        ...options
      });

      axiosApiResponse = {
        loading: false,
        data: result.data,
        error: null
      };

      setResponse(axiosApiResponse); // Set the successful response in the state (ApiOnRender)
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

      setResponse(axiosApiResponse); // Set the error response in the state (ApiOnRender)
    } finally {
      setLoadingOverlay(false);
    }

    return axiosApiResponse;
  };
};
