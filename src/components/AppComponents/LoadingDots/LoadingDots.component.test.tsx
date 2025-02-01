import { cleanup, render } from "@testing-library/react";

import LoadingDots from "./LoadingDots.component";
import config from "./LoadingDots.config";

const { COMPONENT_NAME } = config;

describe('LoadingDots', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'LoadingOverlay';
  const testId = `${screenName}_${COMPONENT_NAME}`;
  const props = {
    screenName,
    name
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
      const { getByTestId } = renderResult;

      expect(getByTestId(testId)).toBeTruthy();
    });

    it('should render loading dots component with 3 dots', () => {
      const firstTestId = `${screenName}_${COMPONENT_NAME}_first_Dot`;
      const secondTestId = `${screenName}_${COMPONENT_NAME}_second_Dot`;
      const thirdTestId = `${screenName}_${COMPONENT_NAME}_third_Dot`;

      const { getByTestId } = renderResult;

      expect(getByTestId(firstTestId)).toBeTruthy();
      expect(getByTestId(secondTestId)).toBeTruthy();
      expect(getByTestId(thirdTestId)).toBeTruthy();
    });
  });
});