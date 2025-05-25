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
} & LoadingOverlayProps;

export type LoadingOverlayProps = {
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingOverlay: boolean;
}