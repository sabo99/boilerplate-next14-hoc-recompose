export type OverlayStateOptions = 'IDLE' | 'LOADING'
export type LoadingTypeOptions = 'SPINNER' | 'DOTS'

export type Options = {
  overlayState: OverlayStateOptions;
  loaderType?: LoadingTypeOptions;
}

export type Props = {
  screenName: string; // from defaultProps
  isLoadingOverlay: boolean // from state config (withOverlay)
  isIdleOverlay: boolean // from state config (withOverlay)
} & Options;