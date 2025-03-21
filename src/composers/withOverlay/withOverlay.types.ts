import { Options as IdlePopupOverlayOptions } from '@/composers/withIdlePopupOverlay/withIdlePopupOverlay.types';
import { Options as LoadingOverlayOptions } from '@/composers/withLoadingOverlay/withLoadingOverlay.types';

export type Options =
  | IdlePopupOverlayOptions
  | LoadingOverlayOptions;

export type OverlayStateOptions = 'IDLE' | 'LOADING';