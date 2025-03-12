import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';

export type OverlayStateOptions = 'IDLE' | 'LOADING'
export type LoadingTypeOptions = 'SPINNER' | 'DOTS'

export type Options = {
  overlayState: OverlayStateOptions;
  loaderType?: LoadingTypeOptions;
  idleTimeout?: number
}

export type Props = {
  screenName: string; // from defaultProps
  isLoadingOverlay: boolean; // from state config (withOverlay)
  isIdleOverlay: boolean; // from state config (withOverlay)
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  idleTimeout?: number;
  alertDialog: AppAlertDialogOptions; // from state config (withOverlay)
  setAlertDialog: React.Dispatch<React.SetStateAction<AppAlertDialogOptions>> // from state config (withOverlay)
} & Options;