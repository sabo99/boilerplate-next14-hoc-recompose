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

type AxiosApiOptions = {
  skipApiOnRender?: boolean;
  baseURL?: string;
  headers?: object;
  params?: object;
}

export type SendRequestApiCallback = (payload?: object) => Promise<AxiosApiResponse> | Promise<void>;

export type AxiosApiRequest = {
  send: SendRequestApiCallback;
}

type AxiosApiError = {
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
