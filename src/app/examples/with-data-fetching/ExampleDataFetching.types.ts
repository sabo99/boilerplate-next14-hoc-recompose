import { UseFormReturn } from 'react-hook-form';

import { Props as withAuthProps } from '@/composers/withAuth/withAuth.types';
import type { ApiRequestSendCallback } from '@/composers/withAxiosApi/withAxiosApi.types';

export type Props = {
  screenName: string;
  setEnabledSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingProduct: boolean;
  errorProduct: any;
  products: Product[];
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  login: ApiRequestSendCallback;
  refetchProducts: OnHandleRefetchProductCallback;
  // Handlers
  onHandleLogin: OnHandleLoginCallback;
  onHandleLogout: OnHandleLogoutCallback;
  onHandleRefetchProducts: OnHandleRefetchProductCallback;
} & withAuthProps

type Product = {
  id: number;
  title: string;
  description: string;
}

export type LoginPayload = {
  username: string;
  password: string;
}

export type LoginForm = UseFormReturn<LoginPayload, any, undefined>

type LoginOptions = {
  form: LoginForm;
}

export type OnHandleLoginCallback = (payload: LoginPayload, options: LoginOptions) => Promise<void>;
export type OnHandleLogoutCallback = (options: LoginOptions) => Promise<void>;
export type OnHandleRefetchProductCallback = () => Promise<void>;