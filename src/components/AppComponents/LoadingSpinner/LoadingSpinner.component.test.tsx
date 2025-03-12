import { cleanup, render } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner.component';
import LoadingSpinnerConfig from './LoadingSpinner.config';

const { sizeClasses, componentName } = LoadingSpinnerConfig;

describe('LoadingSpinner', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'LoadingOverlay';
  const props = {
    screenName
  };
  const testId = `${screenName}_${componentName}`;
  const styledContainerTestId = `${testId}_StyledContainer`;
  const styledSpinnerTestId = `${testId}_StyledSpinner`;

  beforeEach(() => {
    renderResult = render(<LoadingSpinner {...props} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  describe('#render', () => {
    it('should render component with correct testId', () => {
      const { getByTestId } = renderResult;

      expect(getByTestId(styledContainerTestId)).toBeTruthy();
      expect(getByTestId(styledSpinnerTestId)).toBeTruthy();
    });

    it('should render component with customize color', () => {
      const mockProps: any = {
        ...props,
        color: 'border-grey-500'
      };
      const { getByTestId, rerender } = renderResult;

      rerender(<LoadingSpinner {...mockProps} />);

      expect(getByTestId(styledContainerTestId)).toBeTruthy();
      expect(getByTestId(styledSpinnerTestId)).toBeTruthy();
      expect(getByTestId(styledSpinnerTestId))
        .toHaveAttribute('class', `${sizeClasses.medium} border-gray-300 border-t-blue-500 rounded-full animate-spin`);
    });

    it('should render component with customize size', () => {
      const mockProps: any = {
        ...props,
        size: 'small'
      };
      const { getByTestId, rerender } = renderResult;

      rerender(<LoadingSpinner {...mockProps} />);

      expect(getByTestId(styledContainerTestId)).toBeTruthy();
      expect(getByTestId(styledSpinnerTestId)).toBeTruthy();
      expect(getByTestId(styledSpinnerTestId))
        .toHaveAttribute('class', `${sizeClasses.small} border-gray-300 border-t-blue-500 rounded-full animate-spin`);
    });
  });
});