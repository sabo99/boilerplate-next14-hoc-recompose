import type { AxiosApiResponse, ComposedAxiosApiOptions } from '@/types';

export type Props = ComposedAxiosApiOptions & {
  response: AxiosApiResponse;
  setResponse: React.Dispatch<React.SetStateAction<AxiosApiResponse>>;
  skipApiOnRender: boolean;
}