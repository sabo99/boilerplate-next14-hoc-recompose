import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';

export type Options = {
  overlayState: 'IDLE';
  idleTimeout: number;
}

export type Props = {
  // from defaultProps
  screenName: string;
  // from options
  overlayState: 'IDLE',
  idleTimeout: number,
  // from (withIdlePopupOverlay.config)
  isIdleOverlay: boolean;
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  appAlertDialogOptions: AppAlertDialogOptions;
  setAppAlertDialogOptions: React.Dispatch<React.SetStateAction<AppAlertDialogOptions>>
}