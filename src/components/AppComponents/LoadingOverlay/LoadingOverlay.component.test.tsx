import { cleanup, render } from '@testing-library/react';

import LoadingOverlay from './LoadingOverlay.component';
import config from './LoadingOverlay.config';

const { componentName } = config;

describe('LoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = componentName;
  const props: any = {
    variant: 'DOTS'
  };

  beforeEach(() => {
    renderResult = render(<LoadingOverlay {...props} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render loading overlay component', () => {
      const { getByTestId } = renderResult;

      expect(getByTestId(screenName)).toBeTruthy();
    });

    it('should render loading dots component when props variant by default or DOTS', () => {
      const name = 'LoadingDots_StyledContainer';

      const { getByTestId } = renderResult;

      expect(getByTestId(`${screenName}_${name}`)).toBeTruthy();
    });

    it('should render loading spinner component when props variant is SPINNER', () => {
      const name = 'LoadingSpinner_StyledContainer';
      const mockProps = {
        ...props,
        variant: 'SPINNER'
      };
      const { getByTestId, rerender } = renderResult;

      rerender(<LoadingOverlay {...mockProps} />);

      expect(getByTestId(`${screenName}_${name}`)).toBeTruthy();
    });
  });
});