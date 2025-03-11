import { waitFor } from '@testing-library/dom';

import ExampleIdleOverlayHandlers from './ExampleIdleOverlay.handlers';

const {
  onHandleSetAlertDialogOptions,
  onHandleIdleCountdown
} = ExampleIdleOverlayHandlers;

describe('ExampleIdleOverlayHandlers', () => {
  const props = {
    setAlertDialog: jest.fn(),
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

  describe('#onHandleSetAlertDialogOptions', () => {
    it('should called setAlertDialog when alertDialogOptions is provide', async () => {
      const alertDialogOptions = {
        title: 'Title',
        message: 'Message',
        confirmText: 'OK',
        cancelText: 'Cancel',
        onConfirm: jest.fn(),
        onCancel: jest.fn()
      };

      await onHandleSetAlertDialogOptions(props as any)(alertDialogOptions);

      expect(props.setAlertDialog).toHaveBeenCalledWith(alertDialogOptions);
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