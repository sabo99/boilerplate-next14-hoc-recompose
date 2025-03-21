import { waitFor } from '@testing-library/dom';

import ExampleIdleOverlayHandlers from './ExampleIdleOverlay.handlers';

const {
  onHandleSetAppAlertDialogOptions,
  onHandleIdleCountdown
} = ExampleIdleOverlayHandlers;

describe('ExampleIdleOverlayHandlers', () => {
  const props = {
    setAppAlertDialogOptions: jest.fn(),
    setCountdown: jest.fn(),
    setIdleOverlay: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('#onHandleSetAppAlertDialogOptions', () => {
    it('should called setAppAlertDialogOptions when alertDialogOptions is provide', async () => {
      const alertDialogOptions = {
        title: 'Title',
        message: 'Message',
        confirmText: 'OK',
        cancelText: 'Cancel',
        onConfirm: jest.fn(),
        onCancel: jest.fn()
      };

      await onHandleSetAppAlertDialogOptions(props as any)(alertDialogOptions);

      expect(props.setAppAlertDialogOptions).toHaveBeenCalledWith(alertDialogOptions);
    });
  });

  describe('#onHandleIdleCountdown', () => {
    it('should called setCountdown and setIdleOverlay when params is provide', async () => {
      const params = {
        timeout: 5
      };

      await onHandleIdleCountdown(props as any)(params);

      expect(props.setCountdown).toHaveBeenCalledWith(params.timeout);
      await waitFor(() => {
        expect(props.setIdleOverlay).toHaveBeenCalledWith(true);
      },  { timeout: params.timeout * 1000 + 100 });
    });
  });
});