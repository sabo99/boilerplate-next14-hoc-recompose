import { UseFormReturn } from 'react-hook-form';

import type {
  AxiosApiRequestCallback,
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

export interface OnHandleRefetchProductProps extends
  ComposedDefaultPropsOptions,
  ComposedLoadingOverlayProps {
  refetchProducts: AxiosApiRequestCallback;
}

export interface Props extends
  ComposedDefaultPropsOptions,
  ComposedLoadingOverlayProps {
  // Container
  isLoadingProduct: boolean;
  errorProduct: any;
  products: Product[];
  refetchProducts: AxiosApiRequestCallback;

  // Handlers
  onHandleRefetchProducts: OnHandleRefetchProductCallback;
}
