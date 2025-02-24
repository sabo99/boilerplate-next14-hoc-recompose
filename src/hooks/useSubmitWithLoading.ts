/* eslint-disable no-console */
type Props = {
  setShowLoadingOverlay: (value: boolean) => void;
};
type OnSubmit = () => Promise<void>;

const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
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

export default useSubmitWithLoading;