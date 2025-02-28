export type LoadingVariantOptions = 'SPINNER' | 'DOTS'

export type Options = {
  enabledLoadingOverlay: boolean;
  loadingVariant?: LoadingVariantOptions
};

export type Props = {
  isLoadingOverlay: boolean
  loadingVariant?: LoadingVariantOptions
};