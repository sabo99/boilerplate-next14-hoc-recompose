import type { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import type { DefaultPropsOptions } from '@/composers/withComposed/withComposed.types';

export type Props = {
  idleTimeout: number;
} & DefaultPropsOptions

export type OnHandleAppAlertDialogCallback = (
  options: AppAlertDialogOptions
) => Promise<void>;

type IdleCountdownParams = {
  timeout: number
}

export type OnHandleIdleCountdownCallback = (
  params: IdleCountdownParams
) => Promise<void>;
