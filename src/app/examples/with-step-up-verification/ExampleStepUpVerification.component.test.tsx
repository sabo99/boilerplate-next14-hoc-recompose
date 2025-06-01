import { fireEvent, render } from '@testing-library/react';

import { otpDialogOptions, passwordDialogOptions, pinDialogOptions } from '@/fixtures';
import { useStepUp } from '@/hooks';

import ExampleStepUpVerification from './ExampleStepUpVerification.component';

jest.mock('@/hooks');

describe('ExampleStepUpVerification', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const pageTitle = 'Example with Step Up Verification';
  const props = {
    screenName,
    pageTitle,
    permissions: [],
    overlayState: 'STEP_UP_VERIFICATION' as any,
    stepUpVerification: { isOpen: false, type: null },
    setStepUpVerification: jest.fn()
  };
  const appDialogOption = {
    withoutFooter: true,
    buttons: [
      {
        type: 'submit',
        variant: 'default',
        label: 'Confirm'
      }
    ]
  };
  const openStepUp = jest.fn();

  beforeEach(() => {
    (useStepUp as jest.Mock).mockImplementation(() => ({
      openStepUp
    }));

    renderResult = render(<ExampleStepUpVerification {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render component with correctly props without crash', () => {
      const buttonContainerId = `${screenName}_ButtonContainer`;
      const descText = 'Step-Up Verification with Dialog';
      const stepUpPasswordBtnId = `${screenName}_PASSWORD_Button`;
      const stepUpPinBtnId = `${screenName}_PIN_Button`;
      const stepUpOtpBtnId = `${screenName}_OTP_Button`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(buttonContainerId)).toBeTruthy();
      expect(getByText(pageTitle)).toBeTruthy();
      expect(getByText(descText)).toBeTruthy();
      expect(getByTestId(stepUpPasswordBtnId)).toBeTruthy();
      expect(getByTestId(stepUpPinBtnId)).toBeTruthy();
      expect(getByTestId(stepUpOtpBtnId)).toBeTruthy();
    });
  });

  describe('#onClick', () => {
    it('should call openStepUp when stepUpPassword button is clicked', async () => {
      const type = 'PASSWORD';
      const stepUpPasswordBtnId = `${screenName}_${type}_Button`;
      const dialogOptions = { ...appDialogOption, ...passwordDialogOptions };
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(stepUpPasswordBtnId));

      expect(openStepUp).toHaveBeenCalledWith(type, dialogOptions);
    });

    it('should call openStepUp when stepUpPIN button is clicked', () => {
      const type = 'PIN';
      const stepUpPinBtnId = `${screenName}_${type}_Button`;
      const dialogOptions = { ...appDialogOption, ...pinDialogOptions };
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(stepUpPinBtnId));

      expect(openStepUp).toHaveBeenCalledWith(type, dialogOptions);
    });

    it('should call openStepUp when stepUpOTP button is clicked', () => {
      const type = 'OTP';
      const stepUpOtpBtnId = `${screenName}_${type}_Button`;
      const dialogOptions = { ...appDialogOption, ...otpDialogOptions };
      const { getByTestId } = renderResult;

      fireEvent.click(getByTestId(stepUpOtpBtnId));

      expect(openStepUp).toHaveBeenCalledWith(type, dialogOptions);
    });
  });
});