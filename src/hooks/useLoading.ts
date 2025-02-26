type Props = {
  setShowLoadingOverlay: (value: boolean) => void;
};
type OnSubmit = () => Promise<void>;

/* eslint-disable no-console */
export const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
  const { setShowLoadingOverlay } = props;
  setShowLoadingOverlay(true);

  try {
    console.log('showLoadingOverlay:', true);
    return await onSubmit();
  } finally {
    setShowLoadingOverlay(false);
    console.log('showLoadingOverlay:', false);
  }
};