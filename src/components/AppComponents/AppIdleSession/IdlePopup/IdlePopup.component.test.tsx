import { render } from '@testing-library/react';

import IdlePopup from './IdlePopup.component';

describe('IdlePopup', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isOpen: true,
    popupTimeout: 5000,
    onClose: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(<IdlePopup {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render component with correctly props', () => {
      const styledPopupSubtitleTestId = `${screenName}_StyledPopupSubtitle`;
      const styledButtonTestId = `${screenName}_StyledButton`;
      const styledTimerTextTestId = `${screenName}_StyledTimerText`;
      const subtitle = 'Your session time is almost up and you will be automatically returned to the dashboard page.';
      const buttonText = 'Continue Session';
      const timerText = 'In 00:04';

      const { getByTestId } = renderResult;

      expect(getByTestId(styledPopupSubtitleTestId)).toBeTruthy();
      expect(getByTestId(styledPopupSubtitleTestId)).toHaveTextContent(subtitle);
      expect(getByTestId(styledButtonTestId)).toBeTruthy();
      expect(getByTestId(styledButtonTestId)).toHaveTextContent(buttonText);
      expect(getByTestId(styledTimerTextTestId)).toBeTruthy();
      expect(getByTestId(styledTimerTextTestId)).toHaveTextContent(timerText);
    });
    it('should display timer in hh:mm:ss format when popupTimeout is one hour or above', () => {
      const styledTimerTextTestId = `${screenName}_StyledTimerText`;
      const popupTimeout = 3_610_000;
      const timerText = 'In 01:00:09';
      const mockProps = {
        ...props,
        popupTimeout
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<IdlePopup {...mockProps} />);

      expect(getByTestId(styledTimerTextTestId)).toHaveTextContent(timerText);
    });

    it('should display timer unsupport info when popupTimeout is one days or above', () => {
      const styledTimerTextTestId = `${screenName}_StyledTimerText`;
      const popupTimeout = 999_999_000;
      const timerText = 'Session timer cannot display durations longer than 23 hours, 59 minutes, and 59 seconds.';
      const mockProps = {
        ...props,
        popupTimeout
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<IdlePopup {...mockProps} />);

      expect(getByTestId(styledTimerTextTestId)).toHaveTextContent(timerText);
    });
  });
});