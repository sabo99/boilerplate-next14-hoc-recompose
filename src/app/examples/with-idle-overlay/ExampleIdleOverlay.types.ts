import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import { DefaultPropsOptions } from '@/composers/withPage/withPage.types';

export type Props = {
  idleTimeout: number;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertDialog: React.Dispatch<React.SetStateAction<AppAlertDialogOptions>>;
  onHandleSetAlertDialogOptions: OnHandleAlertDialogCallback;
  onHandleIdleCountdown: OnHandleIdleCountdownCallback;
} & DefaultPropsOptions

export type OnHandleAlertDialogCallback = (
  options: AppAlertDialogOptions
) => Promise<void>;

type IdleCountdownParams = {
  timeout: number
}

export type OnHandleIdleCountdownCallback = (
  params: IdleCountdownParams
) => Promise<void>;
