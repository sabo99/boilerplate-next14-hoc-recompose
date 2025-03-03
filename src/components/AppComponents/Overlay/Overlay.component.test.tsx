import { cleanup, render } from '@testing-library/react';

import Overlay from './Overlay.component';
import config from './Overlay.config';

const { componentName } = config;

describe('Overlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props: any = {
    screenName,
    overlayState: 'LOADING',
    loaderType: 'DOTS'
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
          loaderType: 'SPINNER'
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);

        expect(getByTestId(loadingSpinnerTestId)).toBeTruthy();
      });
    });

    describe('#Idle', () => {
      it('should render idle content component when props overlayState is IDLE', () => {
        const contentTestId = `${testId}_StyledContent`;
        const mockProps = {
          ...props,
          overlayState: 'IDLE'
        };
        const { getByTestId, rerender } = renderResult;

        rerender(<Overlay {...mockProps} />);

        expect(getByTestId(contentTestId)).toBeTruthy();
        expect(getByTestId(contentTestId)).toHaveTextContent(/IDLE/i);
      });
    });

  });
});