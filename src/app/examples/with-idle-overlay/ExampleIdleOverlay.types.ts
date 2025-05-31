import type { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import type { ComposedDefaultPropsOptions } from '@/types';

// ============================
// Component Props
// ============================

export interface Props extends ComposedDefaultPropsOptions {
  idleTimeout: number;
}

// ============================
// Callback Types
// ============================

export type OnHandleAppAlertDialogCallback = (
  options: AppAlertDialogOptions
) => Promise<void>;

export interface IdleCountdownParams {
  timeout: number;
}

export type OnHandleIdleCountdownCallback = (
  params: IdleCountdownParams
) => Promise<void>;
