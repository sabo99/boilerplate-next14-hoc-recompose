import { useSubmitWithLoading } from '@/hooks';
describe('useLoading', () => {
  const props = {
    setLoadingOverlay: jest.fn()
  };
  const onSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#useSubmitWithLoading', () => {
    it('should call onSubmit and setLoadingOverlay with false when useSubmitWithLoading is invoked', async () => {
      await useSubmitWithLoading(props, onSubmit);

      expect(onSubmit).toHaveBeenCalled();
      expect(props.setLoadingOverlay).toHaveBeenCalledWith(false);
    });
  });
});