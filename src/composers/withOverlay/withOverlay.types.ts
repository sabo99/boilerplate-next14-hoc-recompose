import { Options as IdlePopupOverlayOptions } from '@/composers/withIdlePopupOverlay/withIdlePopupOverlay.types';
import { Options as LoadingOverlayOptions } from '@/composers/withLoadingOverlay/withLoadingOverlay.types';
import {
  Options as StepUpVerificationOverlayOptions
} from '@/composers/withStepUpVerificationOverlay/withStepUpVerificationOverlay.types';

export type Options =
  | IdlePopupOverlayOptions
  | LoadingOverlayOptions
  | StepUpVerificationOverlayOptions;

export type OverlayStateOptions = 'IDLE' | 'LOADING' | 'STEP_UP_VERIFICATION';