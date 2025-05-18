import { act, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';
import { useIdleTimer, useRouter } from '@/hooks';

import AppIdleSession from './AppIdleSession.component';
import IdlePopup from './IdlePopup';

jest
  .mock('./IdlePopup', () => jest.fn(MockComponent))
  .mock('@/hooks', () => ({
    useRouter: jest.fn(),
    useIdleTimer: jest.fn()
  }));

describe('AppIdleSession', () => {
  const props = {
    screenName: 'TestScreen',
    idleTimeout: 5000,
    popupTimeout: 30000,
    isIdlePopupOverlay: true,
    setIdlePopupOverlay: jest.fn()
  };
  const pause = jest.fn();
  const activate = jest.fn();
  const pausePopupTimer = jest.fn();
  const activePopupTimer = jest.fn();
  const router = {
    replace: jest.fn()
  };

  beforeEach(() => {
    (useIdleTimer as jest.Mock)
      .mockImplementationOnce(() => {
        return { pause, activate };
      })
      .mockImplementationOnce(() => {
        return { pause: pausePopupTimer, activate: activePopupTimer };
      });
    (useRouter as jest.Mock).mockReturnValue(router);

    render(<AppIdleSession {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should show IdlePopup on idle timeout', () => {
      const onIdleCallback = (useIdleTimer as jest.Mock).mock.calls[0][0].onIdle;

      act(() => {
        onIdleCallback();
      });

      expect(props.setIdlePopupOverlay).toHaveBeenCalledWith(true);
      expect(activePopupTimer).toHaveBeenCalled();
      expect(pause).toHaveBeenCalled();
    });

    it('should redirect to root when popup timeout is reached', () => {
      const onIdlePopupTimeout = (useIdleTimer as jest.Mock).mock.calls[1][0].onIdle;
      const path = '/';

      act(() => {
        useRouter();
        onIdlePopupTimeout();
      });

      expect(router.replace).toHaveBeenCalledWith(path);
    });

    it('should close IdlePopup and resume timer when onClose triggered', () => {
      const onClose = (IdlePopup as jest.Mock).mock.calls[0][0].onClose;

      act(() => {
        onClose();
      });

      expect(props.setIdlePopupOverlay).toHaveBeenCalledWith(false);
      expect(activate).toHaveBeenCalled();
      expect(pausePopupTimer).toHaveBeenCalled();
    });
  });
});