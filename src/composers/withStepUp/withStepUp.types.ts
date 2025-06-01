import { UseFormReturn } from 'react-hook-form';

import type {
  AxiosApiRequestCallback,
  ComposedDefaultPropsOptions,
  ComposedLoadingOverlayProps,
  ComposedStepUpVerificationOverlayProps
} from '@/types';

export interface Props extends
  ComposedDefaultPropsOptions, ComposedStepUpVerificationOverlayProps, ComposedLoadingOverlayProps {
  onHandleSubmitStepUpPassword: OnHandleSubmitStepUpPasswordCallback
}

type StepUpPasswordPayload = {
  username: string;
  password: string;
}
type StepUpPasswordOptions = {
  form: UseFormReturn<StepUpPasswordPayload, any, undefined>;
}

export interface OnHandleSubmitStepUpPasswordProps extends ComposedLoadingOverlayProps {
  verifyStepUpPassword: AxiosApiRequestCallback
}
export type OnHandleSubmitStepUpPasswordCallback = (
  payload: StepUpPasswordPayload,
  options: StepUpPasswordOptions
) => Promise<boolean>;
