import { cleanup, render } from '@testing-library/react';

import Overlay from './Overlay.component';
import OverlayConfig from './Overlay.config';
import { Props } from './Overlay.types';

const { componentName } = OverlayConfig;

describe('Overlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props: Props = {
    screenName,
    withoutOpacity: false,
    content: <div>Child Component</div>
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
    it(`should render the overlay component with StyledContainer and the correct testId 
      when overlayState is LOADING and withoutOpacity is false`, () => {
      const containerTestId = `${testId}_StyledContainer`;
      const contentTestId = `${testId}_StyledContent`;
      const className = 'flex w-full h-full justify-center items-center bg-black bg-opacity-80 fixed top-0 left-0 z-50';

      const { getByTestId } = renderResult;

      expect(getByTestId(containerTestId)).toBeTruthy();
      expect(getByTestId(containerTestId)).toHaveClass(className);
      expect(getByTestId(contentTestId)).toBeTruthy();
      expect(getByTestId(contentTestId)).toHaveTextContent('Child Component');
    });

    it(`should render the overlay component with StyledContainerWithoutOpacity and the correct testId 
      when overlayState is IDLE and withoutOpacity is true`, () => {
      const containerTestId = `${testId}_StyledContainer`;
      const contentTestId = `${testId}_StyledContent`;
      const className = 'flex w-full h-full justify-center items-center fixed top-0 left-0 z-50';
      const mockProps: Props = {
        ...props,
        withoutOpacity: true
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<Overlay {...mockProps} />);

      expect(getByTestId(containerTestId)).toBeTruthy();
      expect(getByTestId(containerTestId)).toHaveClass(className);
      expect(getByTestId(contentTestId)).toBeTruthy();
      expect(getByTestId(contentTestId)).toHaveTextContent('Child Component');
    });
  });
});