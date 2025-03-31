import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Config from '@/config';

/**
 * AxiosClient
 *
 * A wrapper around the Axios library to provide a pre-configured Axios instance
 * with custom interceptors and headers for making HTTP requests.
 *
 * @property instance: The Axios instance used for making HTTP requests.
 */
class AxiosClient {
  private instance: AxiosInstance;
  private baseURL: string;

  /**
   * Constructs an AxiosClient instance with the specified base URL.
   *
   * @param baseURL - The base URL for the Axios instance.
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' }
    });

    this.initializeInterceptors();
  }

  /**
   * Returns the Axios instance.
   *
   * @returns The Axios instance.
   */
  public getInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Initializes request and response interceptors for the Axios instance.
   * Ensures that interceptors are only added if the instance exists.
   * @return {void}
   * @private
   */
  private initializeInterceptors(): void {
    this.instance.interceptors.request.use(this.requestInterceptor as any, this.errorInterceptor);
    this.instance.interceptors.response.use(this.responseInterceptor, this.errorInterceptor);
  }

  /**
   * Interceptor for modifying outgoing requests.
   * Adds custom headers to the request.
   *
   * @param request - The Axios request configuration.
   * @returns The modified Axios request configuration.
   */
  private requestInterceptor = async (request: AxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      ...this.getHeaders()
    };
    return request;
  };

  /**
   * Interceptor for handling successful responses.
   *
   * @param response - The Axios response object.
   * @returns The Axios response object.
   */
  private responseInterceptor = (response: AxiosResponse) => response;

  /**
   * Interceptor for handling errors in requests or responses.
   *
   * @param error - The Axios error object.
   * @returns A rejected promise with the error object.
   */
  private errorInterceptor = (error: AxiosError) => {
    return Promise.reject(error);
  };

  /**
   * Generates custom headers for outgoing requests.
   * Includes an API key, optional authorization token, and unique request/session IDs.
   *
   * @returns An object containing custom headers.
   */
  private getHeaders() {
    const accessToken = localStorage.getItem(`${Config.headers.accessTokenKey}`);

    return {
      'X-Api-Key': 'secret',
      'Authorization': `Bearer ${accessToken}`,
      'X-Request-ID': uuidv4(),
      'X-Session-ID': 'X-' + uuidv4()
    };
  }
}

export default AxiosClient;
