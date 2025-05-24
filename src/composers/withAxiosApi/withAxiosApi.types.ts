export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type Options = {
  url: string;
  method: RequestMethod;
  mapProps: (instance: AxiosApiInstance) => object;
  options?: AxiosApiOptions;
};

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

export type AxiosApiRequestSendParams = {
  payload?: Record<string, any>;
  apiOptions?: AxiosApiOptions;
}

export type ApiRequestSendCallback = (params?: AxiosApiRequestSendParams) => Promise<AxiosApiResponse>;

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

export type Props = {
  response: AxiosApiResponse;
  setResponse: React.Dispatch<React.SetStateAction<AxiosApiResponse>>;
  skipApiOnRender: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
} & Options;
