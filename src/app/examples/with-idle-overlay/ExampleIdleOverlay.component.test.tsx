import { act, cleanup, fireEvent, render } from '@testing-library/react';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';
import Config from './ExampleIdleOverlay.config';

const { screenName, defaultValue, delayInterval } = Config;

describe('ExampleIdleOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const props = {
    screenName,
    pageTitle: 'ExampleIdleOverlay',
    permissions: [],
    idleTimeout: 5000,
    countdown: 5,
    setCountdown: jest.fn(),
    setIdleOverlay: jest.fn(),
    setAppAlertDialogOptions: jest.fn(),
    onHandleSetAppAlertDialogOptions: jest.fn(),
    onHandleIdleCountdown: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();

    renderResult = render(
      <ExampleIdleOverlay {...props} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const cardDescriptionTestId = `${screenName}_AppBase_CardDescription`;
      const buttonTestId = `${screenName}_IdleCountdownButton`;

      const { getByTestId } = renderResult;

      expect(getByTestId(cardDescriptionTestId)).toBeTruthy();
      expect(getByTestId(cardDescriptionTestId))
        .toHaveTextContent(defaultValue.idleCountdownDescription(props.countdown));
      expect(getByTestId(buttonTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toHaveTextContent('Run Idle Again');
    });

    it('should call setCountdown when on mount with interval 2 second', () => {
      const attempt = 2;

      act(() => {
        jest.advanceTimersByTime(delayInterval * attempt);
      });

      expect(props.setCountdown).toHaveBeenCalledTimes(attempt);
      expect(props.setCountdown).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should render idle description when countdown is zero', () => {
      const cardDescriptionTestId = `${screenName}_AppBase_CardDescription`;
      const mockProps = {
        ...props,
        countdown: 0
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<ExampleIdleOverlay {...mockProps as any} />);

      expect(getByTestId(cardDescriptionTestId)).toBeTruthy();
      expect(getByTestId(cardDescriptionTestId)).toHaveTextContent(defaultValue.idleDescription);
    });

    it('should disabled button when countdown greater than zero', () => {
      const buttonTestId = `${screenName}_IdleCountdownButton`;

      const { getByTestId } = renderResult;

      expect(getByTestId(buttonTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toHaveTextContent('Run Idle Again');
      expect(getByTestId(buttonTestId)).toHaveAttribute('disabled');
    });
  });

  describe('#onClick', () => {
    it('should call onHandleIdleCountdown when button is clicked', () => {
      const buttonTestId = `${screenName}_IdleCountdownButton`;
      const timeout = 5;
      const mockProps = {
        ...props,
        countdown: 0
      };
      const appAlertDialogOptions = {
        title: 'Idle Timeout Alert',
        message: 'The idle countdown has been reset. Click "Run Idle Again" to start a new countdown.'
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<ExampleIdleOverlay {...mockProps} />);
      fireEvent.click(getByTestId(buttonTestId));

      expect(props.onHandleIdleCountdown).toHaveBeenCalledWith({ timeout });
      expect(props.onHandleSetAppAlertDialogOptions).toHaveBeenCalledWith(appAlertDialogOptions);
    });
  });
});