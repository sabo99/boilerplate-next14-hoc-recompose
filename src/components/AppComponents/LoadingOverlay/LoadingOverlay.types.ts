import { LoadingTypeOptions } from "@/composers/withLoadingOverlay/withLoadingOverlay.types";

export type Props = {
  // from defaultProps
  screenName: string;
  // from options
  loaderType: LoadingTypeOptions,
  // from composer withLoadingOverlay
  isLoadingOverlay: boolean;
};