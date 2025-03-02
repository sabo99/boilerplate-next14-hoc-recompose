import { useSubmitWithLoading } from '@/hooks';

import handlers from './ExampleLoadingOverlay.handlers';

const { onHandleSubmit } = handlers;

jest.mock('@/hooks');

describe('ExampleLoadingOverlayHandlers', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#onHandleSubmit', () => {

    it('should invoke useSubmitWithLoading, onHandleSubmit and loading callbacks when invoked', async () => {
      const props: any = {
        setShowLoadingOverlay: jest.fn()
      };
      const payloadValues = {
        message: 'Test123',
        delay: 3 // in seconds
      };
      const payloadCallback = {
        onBefore: jest.fn(),
        onAfter: jest.fn()
      };
      const expectedCallbacks = expect.any(Function);

      await onHandleSubmit(props)(payloadValues, payloadCallback);
      const { mock: { calls: [[, callback]] } }: any = useSubmitWithLoading;
      await callback();

      expect(useSubmitWithLoading).toHaveBeenCalledWith(props, expectedCallbacks);
    });

  });
});