import { Options as AppAlertDialogOptions } from '@/components/AppComponents/AppAlertDialog/AppAlertDialog.types';
import { LoadingTypeOptions, OverlayStateOptions } from '@/composers/withOverlay/withOverlay.types';

type Callbacks = {
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>
};

export type Props = {
  screenName: string; // from defaultProps
  overlayState: OverlayStateOptions;
  loaderType?: LoadingTypeOptions;
  callbacks: Callbacks;
  alertDialog?: AppAlertDialogOptions;
}