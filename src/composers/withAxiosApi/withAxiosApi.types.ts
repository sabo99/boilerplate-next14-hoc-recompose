import type { AxiosApiResponse, ComposedAxiosApiOptions } from '@/types';

export type Props = {
  response: AxiosApiResponse;
  setResponse: React.Dispatch<React.SetStateAction<AxiosApiResponse>>;
  skipApiOnRender: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
} & ComposedAxiosApiOptions;
