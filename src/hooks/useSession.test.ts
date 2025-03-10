import { act, cleanup, renderHook } from '@testing-library/react';

import { useIdleTimeout } from './useSession';

describe('useSession', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('#useIdleTimeout', () => {
    const defaultTimeout = 60 * 1000;
    const props: any = {
      setIdleOverlay: jest.fn(),
      overlayState: 'IDLE',
      timeout: defaultTimeout
    };

    it('should call setIdleOverlay with false initially', () => {
      renderHook(() => useIdleTimeout(props));

      expect(props.setIdleOverlay).toHaveBeenCalledWith(false);
    });

    it('should call setIdleOverlay with true after timeout', () => {
      renderHook(() => useIdleTimeout(props));

      act(() => {
        jest.advanceTimersByTime(defaultTimeout);
      });

      expect(props.setIdleOverlay).toHaveBeenCalledWith(true);
    });

    it('should call setIdleOverlay with true when reset idle timer on user activity', () => {
      renderHook(() => useIdleTimeout(props));

      act(() => {
        jest.advanceTimersByTime(30000); // Simulate 30 seconds passing
        window.dispatchEvent(new Event('mousemove')); // Simulate activity

        jest.advanceTimersByTime(defaultTimeout); // Another 60 seconds
      });

      expect(props.setIdleOverlay).toHaveBeenCalledWith(true); // Should be idle now
    });
  });
});