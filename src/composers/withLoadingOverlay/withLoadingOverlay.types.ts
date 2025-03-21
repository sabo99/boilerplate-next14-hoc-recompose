export type LoadingTypeOptions = 'SPINNER' | 'DOTS';

export type Options = {
  overlayState: 'LOADING';
  loaderType: LoadingTypeOptions;
}

export type Props = {
  // from defaultProps
  screenName: string;
  // from options
  loaderType: LoadingTypeOptions,
  // from state config (withLoadingOverlay.config)
  isLoadingOverlay: boolean;
};