/* eslint-disable no-console */
type Props = {
  setShowLoadingOverlay: (value: boolean) => void;
};
type OnSubmit = () => Promise<void>;

const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
  const { setShowLoadingOverlay } = props;
  setShowLoadingOverlay(true);

  try {
    return await onSubmit();
  } finally {
    setShowLoadingOverlay(false);
  }
};

export default useSubmitWithLoading;