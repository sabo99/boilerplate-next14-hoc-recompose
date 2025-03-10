import { cleanup, fireEvent, render } from '@testing-library/react';

import { LoadingTypeOptions, OverlayStateOptions } from '@/composers/withOverlay/withOverlay.types';

import Overlay from './Overlay.component';
import OverlayConfig from './Overlay.config';
import { Props } from './Overlay.types';

const { componentName } = OverlayConfig;

describe('Overlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props: Props = {
    screenName,
    overlayState: 'LOADING',
    loaderType: 'DOTS',
    callbacks: {
      setIdleOverlay: jest.fn()
    }
  };
  const testId = `${screenName}_${componentName}`;

  beforeEach(() => {
    renderResult = render(<Overlay {...props} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render overlay component', () => {
      const containerTestId = `${testId}_StyledContainer`;
      const contentTestId = `${testId}_StyledContent`;
      const { getByTestId } = renderResult;

      expect(getByTestId(containerTestId)).toBeTruthy();
      expect(getByTestId(contentTestId)).toBeTruthy();
    });

    describe('#Loading', () => {
      it('should render loading dots component when props loaderType by default or DOTS', () => {
        const loadingDotsTestId = `${testId}_LoadingDots_StyledContainer`;

        const { getByTestId } = renderResult;

        expect(getByTestId(loadingDotsTestId)).toBeTruthy();
      });

      it('should render loading spinner component when props loaderType is SPINNER', () => {
        const loadingSpinnerTestId = `${testId}_LoadingSpinner_StyledContainer`;
        const mockProps = {
          ...props,
          loaderType: 'SPINNER' as LoadingTypeOptions
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);

        expect(getByTestId(loadingSpinnerTestId)).toBeTruthy();
      });
    });

    describe('#Idle', () => {
      it('should render idle content with AppAlertDialog component when props overlayState is IDLE', () => {
        const contentTestId = `${testId}_AppAlertDialog_AlertDialogTitle`;
        const mockProps = {
          ...props,
          overlayState: 'IDLE' as OverlayStateOptions
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);

        expect(getByTestId(contentTestId)).toBeTruthy();
      });

      it('should render idle content with AppAlertDialog component when props alertDialog is provide', () => {
        const contentTestId = `${testId}_AppAlertDialog_AlertDialogTitle`;
        const mockProps = {
          ...props,
          overlayState: 'IDLE' as OverlayStateOptions,
          alertDialog: {
            title: 'Title',
            message: 'Message'
          }
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);

        expect(getByTestId(contentTestId)).toBeTruthy();
        expect(getByTestId(contentTestId)).toHaveTextContent('Title');
      });
    });
  });

  describe('#onClick', () => {
    describe('#Idle', () => {
      it('should be invoke setIdleOverlay when AppAlertDialog button onclick', () => {
        const confirmButtonTestId = `${testId}_AppAlertDialog_AlertDialogAction`;
        const cancelButtonTestId = `${testId}_AppAlertDialog_AlertDialogCancel`;
        const mockProps = {
          ...props,
          overlayState: 'IDLE' as OverlayStateOptions
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);
        fireEvent.click(getByTestId(confirmButtonTestId));
        fireEvent.click(getByTestId(cancelButtonTestId));

        expect(props.callbacks.setIdleOverlay).toHaveBeenCalledTimes(2);
        expect(props.callbacks.setIdleOverlay).toHaveBeenNthCalledWith(1, false);
        expect(props.callbacks.setIdleOverlay).toHaveBeenNthCalledWith(2, false);
      });
    });
  });
});