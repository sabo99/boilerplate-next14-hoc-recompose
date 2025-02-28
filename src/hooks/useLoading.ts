type Props = {
  setLoadingOverlay: (value: boolean) => void;
};
type OnSubmit = () => Promise<void>;

/* eslint-disable no-console */
export const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
  const { setLoadingOverlay } = props;
  setLoadingOverlay(true);

  try {
    console.log('showLoadingOverlay:', true);
    return await onSubmit();
  } finally {
    setLoadingOverlay(false);
    console.log('showLoadingOverlay:', false);
  }
};