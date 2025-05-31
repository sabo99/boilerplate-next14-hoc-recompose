import { ComposedLoadingOverlayProps } from '@/types';

type Props = ComposedLoadingOverlayProps;

export const useSubmitWithLoading = async <T>(props: Props, onSubmit: () => Promise<T>): Promise<T> => {
  const { setLoadingOverlay } = props;
  setLoadingOverlay(true);

  try {
    return await onSubmit();
  } finally {
    setLoadingOverlay(false);
  }
};