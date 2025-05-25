import type { Options as ApiOptions } from '../withAxiosApi/withAxiosApi.types';

export type Options = {
  apiOptions: ApiOptions[];
  loadingOverlay: boolean
}