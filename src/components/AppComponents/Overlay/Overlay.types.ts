import { LoadingTypeOptions, OverlayStateOptions } from '@/composers/withOverlay/withOverlay.types';

export type Props = {
  screenName: string; // from defaultProps
  overlayState: OverlayStateOptions;
  loaderType?: LoadingTypeOptions;
}