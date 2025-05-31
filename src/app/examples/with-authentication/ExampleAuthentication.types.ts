import { UseFormReturn } from 'react-hook-form';

import type {
  AxiosApiRequestCallback,
  ComposedAuthProps,
  ComposedDefaultPropsOptions,
  ComposedLoadingOverlayProps
} from '@/types';

// ============================
// Payload & Form
// ============================

interface LoginPayload {
  username: string;
  password: string;
}

type LoginForm = UseFormReturn<LoginPayload, any, undefined>;

interface LoginOptions {
  form: LoginForm;
}

// ============================
// Handlers
// ============================

export interface OnHandleLoginProps extends ComposedAuthProps, ComposedLoadingOverlayProps {
  login: AxiosApiRequestCallback;
}

export type OnHandleLoginCallback = (
  payload: LoginPayload,
  options: LoginOptions
) => Promise<void>;

export interface OnHandleLogoutProps extends ComposedAuthProps, ComposedLoadingOverlayProps {
  logout: AxiosApiRequestCallback;
}

export type OnHandleLogoutCallback = (
  options: LoginOptions
) => Promise<void>;

// ============================
// Component Props
// ============================

export interface Props extends ComposedDefaultPropsOptions, ComposedAuthProps {
  onHandleLogin: OnHandleLoginCallback;
  onHandleLogout: OnHandleLogoutCallback;
}
