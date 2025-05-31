import handlers from './ExampleDataFetching.handlers';

const { onHandleRefetchProducts } = handlers;

describe('ExampleDataFetchingHandlers', () => {
  const props = {
    refetchProducts: jest.fn(),
    setLoadingOverlay: jest.fn()
  };
  const form = {
    setError: jest.fn(),
    reset: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#onHandleRefetchProducts', () => {
    it('should called refetchProducts with params and form.reset when payload and options is present', async () => {
      const payload = { limit: 5 };
      const options = { form };

      await onHandleRefetchProducts(props as any)(payload, options as any);

      expect(props.refetchProducts).toHaveBeenCalledWith({ apiOptions: { params: payload } });
      expect(form.reset).toHaveBeenCalled();
    });

    it('should called refetchProducts with params when searchParams is present', async () => {
      const searchParams = { limit: 5 };
      const mockProps = {
        ...props,
        searchParams
      };

      await onHandleRefetchProducts(mockProps as any)();

      expect(props.refetchProducts).toHaveBeenCalledWith({ apiOptions: { params: searchParams } });
      expect(form.reset).not.toHaveBeenCalled();
    });

    it('should called refetchProducts without params', async () => {
      await onHandleRefetchProducts(props as any)();

      expect(props.refetchProducts).toHaveBeenCalled();
      expect(form.reset).not.toHaveBeenCalled();
    });
  });
});