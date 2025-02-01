import { cleanup, render } from '@testing-library/react';

import LoadingOverlay from "./LoadingOverlay.component";
import config from './LoadingOverlay.config';

const { COMPONENT_NAME } = config;

describe('LoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = COMPONENT_NAME;
  const name = 'LoadingDots';

  beforeEach(() => {
    renderResult = render(<LoadingOverlay />);
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

    it('should render loading dots component', () => {
      const { getByTestId } = renderResult;

      expect(getByTestId(`${screenName}_${name}`)).toBeTruthy();
    });
  });
});