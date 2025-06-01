import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import Providers from '@/app/providers';

import withStepUpPassword from './withStepUp.composer';

jest
  .mock('@/components/AppComponents/AppDialog', () => jest.fn((props: any) => {
    return props.isOpen
      ? <div data-testid="app-dialog" onClick={props.onAfterClose}>{props.renderContent()}</div>
      : null;
  }))
  .mock('@/components/AppComponents/Overlay', () => jest.fn((props: any) => {
    return <div data-testid="overlay">{props.content}</div>;
  }))
  .mock('@/components/AppComponents/Forms/StepUpPasswordForm', () => jest.fn((props: any) => {
    return (
      <form onSubmit={props.onSubmit} data-testid="password-form">
        <input name="username" defaultValue="emilys" />
        <input name="password" type="password" data-testid="input-password" />
        <button type="submit" data-testid="button-submit">Submit</button>
      </form>
    );
  }));

describe('withStepUp', () => {
  let renderResult: ReturnType<typeof render>;
  const stepUpVerification = {
    isOpen: true,
    type: 'PASSWORD',
    appDialogOption: {}
  };

  const props = {
    screenName: 'TestScreen',
    overlayState: 'STEP_UP_VERIFICATION',
    stepUpVerification,
    setStepUpVerification: jest.fn(),
    isLoadingOverlay: false,
    onHandleSubmitStepUpPassword: jest.fn()
  };
  const Component = (props: any) => {
    return (
      <div {...props}>
        <p>Mock Component</p>
      </div>
    );
  };
  const WrappedComponent = withStepUpPassword()(Component);

  beforeEach(() => {
    renderResult = render(
      <Providers>
        <WrappedComponent {...props} />
      </Providers>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render wrapped component correctly', () => {
      const { getByText } = renderResult;

      expect(getByText('Mock Component')).toBeTruthy();
    });

    it('should render overlay and dialog when isOpen is true', () => {
      const { getByTestId } = renderResult;

      expect(getByTestId('overlay')).toBeTruthy();
      expect(getByTestId('app-dialog')).toBeTruthy();
      expect(getByTestId('password-form')).toBeTruthy();
    });

    it('should not render overlay when not in STEP_UP_VERIFICATION state', () => {
      const mockProps = {
        ...props,
        overlayState: 'OTHER_STATE'
      };
      const { rerender, queryByTestId } = renderResult;

      rerender(
        <Providers>
          <WrappedComponent {...mockProps} />
        </Providers>
      );

      expect(queryByTestId('overlay')).not.toBeInTheDocument();
    });

    it('should not render any step-up form when type is not PASSWORD, PIN, or OTP', () => {
      const mockProps = {
      ...props,
      stepUpVerification: {
        ...stepUpVerification,
        type: 'OTHER_TYPE'
      }
      };
      const { rerender, queryByTestId } = renderResult;

      rerender(
      <Providers>
        <WrappedComponent {...mockProps} />
      </Providers>
      );

      expect(queryByTestId('password-form')).not.toBeInTheDocument();
      expect(queryByTestId('pin-form')).not.toBeInTheDocument();
      expect(queryByTestId('otp-form')).not.toBeInTheDocument();
    });

    it('should not render overlay when isLoadingOverlay is true', () => {
      const mockProps = {
        ...props,
        isLoadingOverlay: true
      };
      const { rerender, queryByTestId } = renderResult;

      rerender(
        <Providers>
          <WrappedComponent {...mockProps} />
        </Providers>
      );

      expect(queryByTestId('overlay')).not.toBeInTheDocument();
    });
  });

  describe('#onClick', () => {
    it('should calll setLoadingOverlay and setStepUpVerification on dialog when onAfterClose', async () => {
      const { getByTestId } = renderResult;
      props.onHandleSubmitStepUpPassword.mockResolvedValue(false);

      act(() => {
        fireEvent.click(getByTestId('app-dialog'));
      });

      await waitFor(() => {
        expect(props.onHandleSubmitStepUpPassword).not.toHaveBeenCalled();
        expect(props.setStepUpVerification).toHaveBeenCalledWith({ isOpen: false, type: null });
      });
    });

    it('should call onHandleSubmitStepUpPassword on form submit and close dialog when successful', async () => {
      const { getByTestId } = renderResult;
      props.onHandleSubmitStepUpPassword.mockResolvedValue(true);

      act(() => {
        fireEvent.change(getByTestId('input-password'), { target: { value: 'correctpassword' } });
        fireEvent.click(getByTestId('button-submit'));
      });

      await waitFor(() => {
        expect(props.onHandleSubmitStepUpPassword).toHaveBeenCalled();
        expect(props.setStepUpVerification).toHaveBeenCalledWith({ isOpen: false, type: null });
      });
    });

  });
});