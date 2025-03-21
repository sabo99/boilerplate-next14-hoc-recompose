import { OverlayStateOptions } from '@/composers/withOverlay/withOverlay.types';

export type Props = {
  screenName: string; // from defaultProps
  overlayState: OverlayStateOptions;
  content: React.ReactNode;
}