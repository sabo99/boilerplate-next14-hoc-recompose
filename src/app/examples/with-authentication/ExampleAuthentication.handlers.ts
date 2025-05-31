import { useSubmitWithLoading } from '@/hooks';

import type {
  OnHandleLoginCallback,
  OnHandleLoginProps,
  OnHandleLogoutCallback,
  OnHandleLogoutProps
} from './ExampleAuthentication.types';

const doHandleLogin = (props: OnHandleLoginProps): OnHandleLoginCallback => async (payload, options) => {
  const { login, setSession, setActiveAccount, clearSelectedRelogAccount, clearSession } = props;
  const { form } = options;

  const { data, error } = await login({ payload });

  if (error) {
    form.setError('username', { message: error.message });
    clearSession();
    return;
  }

  const { accessToken, refreshToken, id: sessionId, ...activeAccount } = data;
  setSession({
    isAuthenticated: true,
    sessionId,
    accessToken,
    refreshToken
  });
  setActiveAccount(activeAccount);
  clearSelectedRelogAccount();
  form.reset();
};

const onHandleLogin = (props: OnHandleLoginProps): OnHandleLoginCallback => async (payload, options) => {
  await useSubmitWithLoading<void>(
    props,
    async () => doHandleLogin(props)(payload, options)
  );
};

const doHandleLogout = (props: OnHandleLogoutProps): OnHandleLogoutCallback => async (options) => {
  const { clearSession } = props;
  const { form } = options;

  await new Promise(resolve => setTimeout(resolve, 1000));

  clearSession();
  form.reset();
};
const onHandleLogout = (props: OnHandleLogoutProps): OnHandleLogoutCallback => async (options) => {
  await useSubmitWithLoading<void>(
    props,
    async () => doHandleLogout(props)(options)
  );
};

const handlers = {
  onHandleLogin,
  onHandleLogout
};

export default handlers;