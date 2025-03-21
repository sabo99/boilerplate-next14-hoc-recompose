import { cleanup, fireEvent, render } from '@testing-library/react';

import AppAlertDialog from './AppAlertDialog.component';
import config from './AppAlertDialog.config';

const { componentName } = config;

describe('AppAlertDialog', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'Screen';
  const testId = `${screenName}_${componentName}`;
  const titleTestId = `${testId}_AlertDialogTitle`;
  const descTestId = `${testId}_AlertDialogDescription`;
  const cancelTestId = `${testId}_AlertDialogCancel`;
  const confirmTestId = `${testId}_AlertDialogAction`;

  beforeEach(() => {
    renderResult = render(<AppAlertDialog screenName={screenName} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it(`should open alert dialog with title, description, cancel button and
      confirm button when with default props`, () => {
      const { getByTestId, queryAllByTestId } = renderResult;

      expect(queryAllByTestId(/AppAlertDialog/i)).toBeTruthy();
      expect(getByTestId(titleTestId)).toBeTruthy();
      expect(getByTestId(descTestId)).toBeTruthy();
      expect(getByTestId(cancelTestId)).toBeTruthy();
      expect(getByTestId(confirmTestId)).toBeTruthy();
    });

    it(`should open alert dialog with custom title, message, cancel button and
      confirm button when with custom props`, () => {
      const title = 'Custom Title';
      const message = 'Custom Description';
      const cancelText = 'Custom Cancel';
      const confirmText = 'Custom Confirm';

      const { getByTestId, rerender } = renderResult;
      rerender(
        <AppAlertDialog
          screenName={screenName}
          title={title}
          message={message}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      );

      expect(getByTestId(titleTestId)).toHaveTextContent(title);
      expect(getByTestId(descTestId)).toHaveTextContent(message);
      expect(getByTestId(cancelTestId)).toHaveTextContent(cancelText);
      expect(getByTestId(confirmTestId)).toHaveTextContent(confirmText);
    });
  });

  describe('#onClick', () => {
    const setIdleOverlay = jest.fn();

    it('should invoke onConfirm and setIdleOverlay when confirm button is clicked', () => {
      const onConfirm = jest.fn();

      const { getByTestId, rerender } = renderResult;
      rerender(
        <AppAlertDialog
          screenName={screenName}
          onConfirm={onConfirm}
          setIdleOverlay={setIdleOverlay}
        />
      );
      fireEvent.click(getByTestId(confirmTestId));

      expect(setIdleOverlay).toHaveBeenCalledWith(false);
      expect(onConfirm).toHaveBeenCalled();
    });

    it('should invoke onCancel and setIdleOverlay when cancel button is clicked', () => {
      const onCancel = jest.fn();

      const { getByTestId, rerender } = renderResult;
      rerender(
        <AppAlertDialog
          screenName={screenName}
          onCancel={onCancel}
          setIdleOverlay={setIdleOverlay}
        />
      );
      fireEvent.click(getByTestId(cancelTestId));

      expect(setIdleOverlay).toHaveBeenCalledWith(false);
      expect(onCancel).toHaveBeenCalled();
    });
  });

});