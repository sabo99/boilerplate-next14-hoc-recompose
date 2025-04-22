import type {
  OnHandleLoginCallback,
  OnHandleLogoutCallback,
  OnHandleRefetchProductCallback,
  Props
} from './ExampleDataFetching.types';

const onHandleLogin = (props: Props): OnHandleLoginCallback => async (payload, options) => {
  const { login, setSession, setActiveAccount, clearSelectedRelogAccount, clearSession } = props;
  const { form } = options;

  const { data, error } = await login({ payload });

  if (error) {
    form.setError('username', { message: error.message });
    clearSession();
    return;
  }

  if (data) {
    const { accessToken, refreshToken, id: sessionId, ...activeAccount } = data;
    setSession({
      isAuthenticated: true,
      sessionId,
      accessToken,
      refreshToken
    });
    setActiveAccount(activeAccount);
    clearSelectedRelogAccount();
  }

  form.reset();
};

const onHandleLogout = (props: Props): OnHandleLogoutCallback => async (options) => {
  const { clearSession } = props;
  const { form } = options;

  clearSession();
  form.reset();
};

const onHandleRefetchProducts = (props: Props): OnHandleRefetchProductCallback => async () => {
  const { refetchProducts } = props;
  await refetchProducts();
};

const handlers = {
  onHandleLogin,
  onHandleLogout,
  onHandleRefetchProducts
};

export default handlers;