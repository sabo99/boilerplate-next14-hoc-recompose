type Props = {
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};
type OnSubmit = () => Promise<any>;

export const useSubmitWithLoading = async (props: Props, onSubmit: OnSubmit) => {
  const { setLoadingOverlay } = props;
  setLoadingOverlay(true);

  try {
    return await onSubmit();
  } finally {
    setLoadingOverlay(false);
  }
};