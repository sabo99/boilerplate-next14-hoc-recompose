import handlers from './ExampleDataFetching.handlers';

const { onHandleLogin, onHandleLogout, onHandleRefetchProducts } = handlers;

describe('ExampleDataFetchingHandlers', () => {
  const props = {
    login: jest.fn(),
    setSession: jest.fn(),
    setActiveAccount: jest.fn(),
    clearSelectedRelogAccount: jest.fn(),
    clearSession: jest.fn(),
    refetchProducts: jest.fn()
  };
  const form = {
    setError: jest.fn(),
    reset: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#onHandleLogin', () => {
    it('should called form.setError and clearSession when login erorr', async () => {
      const payload = { username: 'user', password: 'wrongpass' };
      const options = { form };
      const error = { message: 'Invalid credentials' };
      props.login.mockResolvedValue({ data: null, error });

      await onHandleLogin(props as any)(payload, options as any);

      expect(form.setError).toHaveBeenCalledWith('username', error);
      expect(props.clearSession).toHaveBeenCalled();
    });

    it(`should called setSession, setActiveAccount, clearSelectedRelogAccount, clearSession 
      and form.reset when login success`, async () => {
      const payload = {
        username: 'emelys',
        password: 'emelyspass'
      };
      const options = { form };
      const data = {
        accessToken: 'token',
        refreshToken: 'refresh',
        id: 'session123',
        name: 'John Doe'
      };
      props.login.mockResolvedValue({ data, error: null });

      await onHandleLogin(props as any)(payload, options as any);

      expect(props.setSession).toHaveBeenCalledWith({
        isAuthenticated: true,
        sessionId: 'session123',
        accessToken: 'token',
        refreshToken: 'refresh'
      });
      expect(props.setActiveAccount).toHaveBeenCalledWith({ name: 'John Doe' });
      expect(props.clearSelectedRelogAccount).toHaveBeenCalled();
      expect(form.reset).toHaveBeenCalled();
    });
  });

  describe('#onHandleLogout', () => {
    it('should called clearSession and form.reset when handle logout', async () => {
      const options = { form };

      await onHandleLogout(props as any)(options as any);

      expect(props.clearSession).toHaveBeenCalled();
      expect(form.reset).toHaveBeenCalled();
    });
  });

  describe('#onHandleRefetchProducts', () => {
    it('should called refetchProducts with params and form.reset when payload and options is present', async () => {
      const payload = { limit: 5 };
      const options = { form };

      await onHandleRefetchProducts(props as any)(payload, options as any);

      expect(props.refetchProducts).toHaveBeenCalledWith({ apiOptions: { params: payload } });
      expect(form.reset).toHaveBeenCalled();
    });

    it('should called refetchProducts without params', async()=>{
      await onHandleRefetchProducts(props as any)();

      expect(props.refetchProducts).toHaveBeenCalled();
    });
  });
});