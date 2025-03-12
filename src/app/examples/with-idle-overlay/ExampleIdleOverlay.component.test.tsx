import { act, cleanup, fireEvent, render } from '@testing-library/react';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';
import Config from './ExampleIdleOverlay.config';
import { Props } from './ExampleIdleOverlay.types';

const { screenName, defaultValue, delayInterval } = Config;

describe('ExampleIdleOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const props: Props = {
    screenName,
    pageTitle: 'ExampleIdleOverlay',
    permissions: [],
    idleTimeout: 5000,
    countdown: 5,
    setCountdown: jest.fn(),
    setIdleOverlay: jest.fn(),
    setAlertDialog: jest.fn(),
    onHandleSetAlertDialogOptions: jest.fn(),
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

    it('should call onHandleSetAlertDialogOptions with expected options on mount', () => {
      const options = {
        onConfirm: expect.any(Function),
        onCancel: expect.any(Function)
      };

      expect(props.onHandleSetAlertDialogOptions).toHaveBeenCalledTimes(1);
      expect(props.onHandleSetAlertDialogOptions).toHaveBeenCalledWith(options);
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

      const { getByTestId, rerender } = renderResult;
      rerender(<ExampleIdleOverlay {...mockProps} />);
      fireEvent.click(getByTestId(buttonTestId));

      expect(getByTestId(buttonTestId)).toBeTruthy();
      expect(getByTestId(buttonTestId)).toHaveTextContent('Run Idle Again');
      expect(props.onHandleIdleCountdown).toHaveBeenCalledWith({ timeout });
    });
  });
});