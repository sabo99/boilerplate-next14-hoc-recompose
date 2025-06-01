import type { AppDialogOption, ComposedStepUpTypeOptions, ComposedStepUpVerificationOverlayProps } from '@/types';

type Props = Omit<ComposedStepUpVerificationOverlayProps, 'overlayState' | 'stepUpVerification'>;

export const useStepUp = (props: Props) => {
  const { setStepUpVerification } = props;

  const openStepUp = (type: ComposedStepUpTypeOptions, appDialogOption: AppDialogOption) => {
    setStepUpVerification({
      type,
      isOpen: true,
      appDialogOption
    });
  };

  const closeStepUp = () => {
    setStepUpVerification({
      type: null,
      isOpen: false
    });
  };

  return {
    openStepUp,
    closeStepUp
  };
};