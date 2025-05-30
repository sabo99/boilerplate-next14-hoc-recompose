/**
 * ============================
 * Composers
 * ============================
 */
export type ComposedAxiosApiOptions = {
  url: string;
  method: RequestMethod;
  mapProps: (instance: AxiosApiInstance) => object;
  options?: AxiosApiOptions;
}

/**
 * ============================
 * AxiosAPI (Client)
 * ============================
 */
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type AxiosApiInstance = {
  request: AxiosApiRequest;
  response: AxiosApiResponse;
}

export type AxiosApiOptions = {
  skipApiOnRender?: boolean;
  baseURL?: string;
  headers?: object;
  params?: object;
}

export type AxiosApiRequestSendArgs = {
  payload?: Record<string, any>;
  apiOptions?: AxiosApiOptions;
}

export type ApiRequestSendCallback = (args?: AxiosApiRequestSendArgs) => Promise<AxiosApiResponse>;

export type AxiosApiRequest = {
  send: ApiRequestSendCallback;
}

export type AxiosApiError = {
  statusCode?: number;
  message?: string;
  code?: string;
}

export type AxiosApiResponse = {
  loading: boolean;
  error?: AxiosApiError | null;
  data?: any;
}

/**
 * ============================
 * Services
 * ============================
 */
export type ApiCallOptions = {
  url: string;
  method: RequestMethod;
  options: AxiosApiOptions
};

export type AuthServiceOptions = {
  apiOptions: AxiosApiOptions
}

export type ProductServiceOptions = {
  apiOptions: AxiosApiOptions
}