import { withProps, withState } from 'react-recompose';

import withStepUpPassword from '@/composers/withStepUpPassword';
import withStepUpVerificationOverlay from '@/composers/withStepUpVerificationOverlay';

jest.mock('react-recompose')
  .mock('@/composers/withStepUpPassword');

describe('withStepUpVerificationOverlay', () => {
  const options: any = {
    overlayState: 'STEP_UP_VERIFICATION'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#withProps', () => {
    it('should invoke withProps when `options` is present', () => {
      withStepUpVerificationOverlay(options);

      expect(withProps).toHaveBeenCalledWith(options);
    });
  });

  describe('#withState', () => {
    it('should invoke withState when withStepUpVerification called', () => {
      const state = ['stepUpVerification', 'setStepUpVerification', { isOpen: false, type: null }];
      withStepUpVerificationOverlay(options);

      expect(withState).toHaveBeenCalledWith(...state);
    });
  });

  describe('#withStepUpPassword', () => {
    it('should invoke withStepUpPassword when withStepUpVerification called', () => {
      withStepUpVerificationOverlay(options);

      expect(withStepUpPassword).toHaveBeenCalled();
    });
  });
});