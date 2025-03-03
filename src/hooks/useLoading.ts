type Props = {
  setLoadingOverlay: (value: boolean) => void;
};
type OnSubmit = () => Promise<void>;

export const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
  const { setLoadingOverlay } = props;
  setLoadingOverlay(true);

  try {
    return await onSubmit();
  } finally {
    setLoadingOverlay(false);
  }
};