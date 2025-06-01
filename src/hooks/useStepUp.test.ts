import { act, renderHook } from '@testing-library/react';

import { AppDialogOption, ComposedStepUpTypeOptions } from '@/types';

import { useStepUp } from './useStepUp';

describe('useStepUp', () => {
  const props = {
    setStepUpVerification: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#useStepUp', () => {
    const type: ComposedStepUpTypeOptions = 'OTP';
    const appDialogOption: AppDialogOption = {
      title: 'Verify Your Identity',
      subtitle: 'Please enter the OTP sent to your phone'
    };

    it('should call setStepUpVerification with correct values on openStepUp', () => {
      const { result } = renderHook(() => useStepUp(props));
      const expectedResult = {
        type,
        isOpen: true,
        appDialogOption
      };

      act(() => {
        result.current.openStepUp(type, appDialogOption);
      });

      expect(props.setStepUpVerification).toHaveBeenCalledWith(expectedResult);
    });

    it('should call setStepUpVerification with correct values on closeStepUp', () => {
      const { result } = renderHook(() => useStepUp(props));
      const expectedResult = {
        type: null,
        isOpen: false
      };

      act(() => {
        result.current.closeStepUp();
      });

      expect(props.setStepUpVerification).toHaveBeenCalledWith(expectedResult);
    });
  });
});