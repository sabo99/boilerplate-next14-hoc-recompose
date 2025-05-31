import { UseFormReturn } from 'react-hook-form';

import type {
  AxiosApiRequestCallback,
  ComposedAuthProps,
  ComposedDefaultPropsOptions,
  ComposedLoadingOverlayProps,
  Product
} from '@/types';

// ============================
// Payloads & Forms
// ============================

export interface RefetchPayload {
  limit: number;
}

export type RefetchForm = UseFormReturn<RefetchPayload, any, undefined>;

export interface RefetchOptions {
  form: RefetchForm;
}

// ============================
// Callback Types
// ============================

export type OnHandleRefetchProductCallback = (
  payload?: RefetchPayload,
  options?: RefetchOptions
) => Promise<void>;

// ============================
// Component Props
// ============================

export interface Props extends
  ComposedDefaultPropsOptions,
  ComposedAuthProps,
  ComposedLoadingOverlayProps {
  // Container
  isLoadingProduct: boolean;
  errorProduct: any;
  products: Product[];
  login: AxiosApiRequestCallback;
  refetchProducts: AxiosApiRequestCallback;

  // Handlers
  onHandleRefetchProducts: OnHandleRefetchProductCallback;
}
