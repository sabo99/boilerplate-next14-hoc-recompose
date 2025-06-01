import { useSubmitWithLoading } from '@/hooks';

import type {
  OnHandleSubmitStepUpPasswordCallback,
  OnHandleSubmitStepUpPasswordProps
} from './withStepUp.types';

const doHandleSubmitStepUpPassword = (
  props: OnHandleSubmitStepUpPasswordProps
): OnHandleSubmitStepUpPasswordCallback => async (payload, options) => {
  const { verifyStepUpPassword } = props;
  const { form } = options;

  const { error } = await verifyStepUpPassword({ payload });
  if (error) {
    form.setError('password', { message: error.message });
    return false;
  }

  form.reset();
  return true;
};
const onHandleSubmitStepUpPassword = (
  props: OnHandleSubmitStepUpPasswordProps
): OnHandleSubmitStepUpPasswordCallback => async (payload, options) => {
  return await useSubmitWithLoading<boolean>(
    props,
    async () => doHandleSubmitStepUpPassword(props)(payload, options)
  );
};

// const doHandleSubmitStepUpPIN = () => () => {

// };
// const onHandleSubmitStepUpPIN = () => () => {
  
// };

const handlers = {
  onHandleSubmitStepUpPassword
};

export default handlers;