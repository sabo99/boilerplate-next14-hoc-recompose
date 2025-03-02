import { cleanup, render } from '@testing-library/react';

import LoadingDots from './LoadingDots.component';
import config from './LoadingDots.config';

const { componentName } = config;

describe('LoadingDots', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'LoadingOverlay';
  const testId = `${screenName}_${componentName}`;
  const props = {
    screenName
  };

  beforeEach(() => {
    renderResult = render(<LoadingDots {...props} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render loading dots component with props', () => {
      const styledContainer = `${testId}_StyledContainer`;
      const { getByTestId } = renderResult;

      expect(getByTestId(styledContainer)).toBeTruthy();
    });

    it('should render loading dots component with 3 dots', () => {
      const firstTestId = `${testId}_first_Dot`;
      const secondTestId = `${testId}_second_Dot`;
      const thirdTestId = `${testId}_third_Dot`;

      const { getByTestId } = renderResult;

      expect(getByTestId(firstTestId)).toBeTruthy();
      expect(getByTestId(secondTestId)).toBeTruthy();
      expect(getByTestId(thirdTestId)).toBeTruthy();
    });
  });
});