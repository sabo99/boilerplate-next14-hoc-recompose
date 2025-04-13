import { UseFormReturn } from 'react-hook-form';

import { Props as withAuthProps } from '@/composers/withAuth/withAuth.types';
import type { SendRequestApiCallback } from '@/composers/withAxiosApi/withAxiosApi.types';

export type Props = {
  screenName: string;
  setEnabledSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingProduct: boolean;
  errorProduct: any;
  products: Product[];
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  login: SendRequestApiCallback;
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

type LoginPayload = {
  username: string;
  password: string;
}

type LoginOptions = {
  form: UseFormReturn<LoginPayload, any, undefined>;
}

export type OnHandleLoginCallback = (payload: LoginPayload, options: LoginOptions) => Promise<void>;
export type OnHandleLogoutCallback = (options: LoginOptions) => Promise<void>;
export type OnHandleRefetchProductCallback = () => Promise<void>;