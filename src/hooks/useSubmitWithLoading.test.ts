import { useSubmitWithLoading } from "@/hooks";
describe('useSubmitWithLoading', () => {
  const props = {
    setShowLoadingOverlay: jest.fn()
  };
  const onSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#useSubmitWithLoading', () => {
    it('should call onSubmit and setShowLoadingOverlay with false when useSubmitWithLoading is invoked', async ()=>{
      await useSubmitWithLoading(props, onSubmit);

      expect(onSubmit).toHaveBeenCalled();
      expect(props.setShowLoadingOverlay).toHaveBeenCalledWith(false);
    });
  });
});