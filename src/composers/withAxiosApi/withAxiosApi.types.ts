export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type Options = {
  url?: string;
  method: RequestMethod;
  mapProps: (instance: AxiosApiInstance) => object;
  options?: AxiosApiOptions;
};

export type AxiosApiInstance = {
  request: Request;
  response: Response;
}

type AxiosApiOptions = {
  skipApiOnRender?: boolean;
  baseURL?: string;
  headers?: object;
  params?: object;
}

export type RequestSendCallback = (payload: object) => Promise<Response>;
export type RequestRefetchCallback = () => Promise<any>;

type Request = {
  send: RequestSendCallback;
  refetch: RequestRefetchCallback;
}

type Response = {
  loading: boolean;
  error?: any;
  data?: any;
}

export type Props = {
  response: Response;
  setResponse: React.Dispatch<React.SetStateAction<Response>>;
  skipApiOnRender: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
} & Options;
