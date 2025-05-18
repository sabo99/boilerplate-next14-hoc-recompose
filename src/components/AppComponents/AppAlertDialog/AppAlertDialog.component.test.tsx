import { cleanup, fireEvent, render } from '@testing-library/react';

import AppAlertDialog from './AppAlertDialog.component';
import config from './AppAlertDialog.config';

const { componentName } = config;

describe('AppAlertDialog', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'Screen';
  const title = 'Custom Title';
  const message = 'Custom Message';
  const cancelText = 'Custom Cancel';
  const confirmText = 'Custom Confirm';
  const onClick = jest.fn();
  const cancelButton = {
    onClick,
    text: cancelText
  };
  const confirmButton = {
    onClick,
    text: confirmText
  };
  const props = {
    screenName,
    title,
    message,
    cancelButton,
    confirmButton
  };

  const testId = `${screenName}_${componentName}`;
  const titleTestId = `${testId}_AlertDialogTitle`;
  const messageTestId = `${testId}_AlertDialogDescription`;
  const cancelTestId = `${testId}_AlertDialogCancel`;
  const confirmTestId = `${testId}_AlertDialogAction`;

  beforeEach(() => {
    renderResult = render(<AppAlertDialog {...props} />);
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
      expect(getByTestId(messageTestId)).toBeTruthy();
      expect(getByTestId(cancelTestId)).toBeTruthy();
      expect(getByTestId(confirmTestId)).toBeTruthy();
    });

    it(`should open alert dialog with custom title, message, cancel button and
      confirm button when with custom props`, () => {
      const { getByTestId, rerender } = renderResult;

      rerender(
        <AppAlertDialog {...props} />
      );

      expect(getByTestId(titleTestId)).toHaveTextContent(title);
      expect(getByTestId(messageTestId)).toHaveTextContent(message);
      expect(getByTestId(cancelTestId)).toHaveTextContent(cancelText);
      expect(getByTestId(confirmTestId)).toHaveTextContent(confirmText);
    });

    it('should render component withoutFooter when props withoutFooter is true', () => {
      const mockProps = {
        screenName,
        title,
        message
      };
      const { queryByTestId, rerender } = renderResult;

      rerender(
        <AppAlertDialog {...mockProps} withoutFooter />
      );

      expect(queryByTestId(cancelTestId)).not.toBeInTheDocument();
      expect(queryByTestId(confirmTestId)).not.toBeInTheDocument();
    });

    it('should render default button text, title and message when default props are missing', () => {
      const mockProps = {
        screenName,
        confirmButton: { onClick },
        cancelButton: { onClick }
      };
      const { queryByTestId, rerender } = renderResult;

      rerender(
        <AppAlertDialog {...mockProps} />
      );

      expect(queryByTestId(titleTestId)).toHaveTextContent('Alert');
      expect(queryByTestId(messageTestId)).toHaveTextContent('Are you sure you want to proceed?');
      expect(queryByTestId(cancelTestId)).toHaveTextContent('Cancel');
      expect(queryByTestId(confirmTestId)).toHaveTextContent('Confirm');
    });
  });

  describe('#onClick', () => {
    it('should invoke confirmButton.onClick when confirm button is clicked', () => {
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(confirmTestId));

      expect(confirmButton.onClick).toHaveBeenCalled();
    });

    it('should invoke cancelButton.onClick when cancel button is clicked', () => {
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(cancelTestId));

      expect(cancelButton.onClick).toHaveBeenCalled();
    });
  });

});