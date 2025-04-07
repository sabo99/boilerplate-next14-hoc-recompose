import type {
  OnHandleLoginCallback,
  OnHandleLogoutCallback,
  OnHandleRefetchProductCallback,
  Props
} from './ExampleDataFetching.types';

const onHandleLogin = (props: Props): OnHandleLoginCallback => async (payload, options) => {
  const { login, setAuthenticated, setAccessToken, setRefreshToken, setUserInfo, setSessionId } = props;
  const { form } = options;

  const { data, error } = await login(payload);

  if (error) {
    form.setError('username', { message: error.message });
    setAuthenticated(false);
    return;
  }

  if (data) {
    const { accessToken, refreshToken, id: sessionId, ...userInfo } = data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setSessionId(sessionId);
    setUserInfo(userInfo);
  }

  setAuthenticated(true);
  form.reset();
};

const onHandleLogout = (props: Props): OnHandleLogoutCallback => async (options) => {
  const { setAuthenticated, clearAuthState } = props;
  const { form } = options;

  setAuthenticated(false);
  clearAuthState();
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