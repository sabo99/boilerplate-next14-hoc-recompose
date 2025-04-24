import type { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import type { DefaultPropsOptions } from '@/composers/withPage/withPage.types';

export type Props = {
  idleTimeout: number;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setAppAlertDialogOptions: React.Dispatch<React.SetStateAction<AppAlertDialogOptions>>;
  onHandleSetAppAlertDialogOptions: OnHandleAppAlertDialogCallback;
  onHandleIdleCountdown: OnHandleIdleCountdownCallback;
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
