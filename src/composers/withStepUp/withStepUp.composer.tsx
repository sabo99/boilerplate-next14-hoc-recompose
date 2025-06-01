import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { compose } from 'react-recompose';
import z from 'zod';

import AppDialog from '@/components/AppComponents/AppDialog';
import StepUpPasswordForm from '@/components/AppComponents/Forms/StepUpPasswordForm';
import Overlay from '@/components/AppComponents/Overlay';
import { useStepUp } from '@/hooks';

import withStepUpPasswordConfig from './withStepUp.config';
import type { Props } from './withStepUp.types';

const { stepUpPasswordFormSchema, stepUpPasswordFormDefaultValue } = withStepUpPasswordConfig;

const ComposedStepUpPassword = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      overlayState,
      stepUpVerification,
      setStepUpVerification,
      isLoadingOverlay,
      onHandleSubmitStepUpPassword
    } = props;
    const { isOpen: isOpenStepUp, type: stepUpType, appDialogOption } = stepUpVerification;
    const isStepUpVerficiation = overlayState === 'STEP_UP_VERIFICATION';
    const isHidden = isLoadingOverlay;
    const isOpen = isOpenStepUp && isStepUpVerficiation && !isHidden;
    const { closeStepUp } = useStepUp({ setStepUpVerification });

    const stepUpPasswordForm = useForm<z.infer<typeof stepUpPasswordFormSchema>>({
      resolver: zodResolver(stepUpPasswordFormSchema),
      defaultValues: {
        ...stepUpPasswordFormDefaultValue,
        username: 'emilys' // Mock as already login
      }
    });

    const onClose = () => {
      closeStepUp();
    };

    const onSubmitStepUpPassword = async (payload: any) => {
      const result = await onHandleSubmitStepUpPassword(payload, { form: stepUpPasswordForm });

      if (result) {
        onClose();
      }
    };

    const renderContent = () => {
      switch (stepUpType) {
        case 'PASSWORD':
          return (
            <StepUpPasswordForm
              {...props}
              name='StepUpPasswordForm'
              form={stepUpPasswordForm}
              onSubmit={onSubmitStepUpPassword}
              appDialogOption={appDialogOption}
            />
          );
        // case 'PIN':
        //   return (
        //     <StepUpPasswordForm
        //       {...props}
        //       name='StepUpPasswordForm'
        //       form={stepUpPasswordForm}
        //       onSubmit={onSubmitStepUpPassword}
        //       appDialogOption={appDialogOption}
        //     />
        //   );
        default:
          return null;
      }

    };

    const renderAppDialog = () => (
      <AppDialog
        {...props}
        {...(appDialogOption && { ...appDialogOption })}
        isOpen={isOpen}
        renderContent={renderContent}
        onAfterClose={onClose}
      />
    );

    return (
      <>
        {isOpen && (
          <Overlay
            {...props}
            content={renderAppDialog()}
            withoutOpacity
          />
        )}
        <ComposedComponent {...props} />
      </>
    );
  };

  return HOC;
};

const withStepUpPassword = () => compose(
  ComposedStepUpPassword
);

export default withStepUpPassword;