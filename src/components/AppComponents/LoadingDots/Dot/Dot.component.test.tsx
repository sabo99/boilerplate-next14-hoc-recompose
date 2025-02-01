import { cleanup, render } from '@testing-library/react';

import Dot from './Dot.component';
import config from './Dot.config';

const { COMPONENT_NAME } = config;

describe('Dot', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'LoadingOverlay';
  const name = 'LoadingDots';
  const testId = `${screenName}_${name}_${COMPONENT_NAME}`;
  const props = {
    screenName,
    name
  };

  beforeEach(() => {
    renderResult = render(<Dot {...props} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render dot component with props', () => {
      const { getByTestId } = renderResult;

      expect(getByTestId(testId)).toBeTruthy();
    });

    it('should render dot component without props.className', () => {
      const { container } = renderResult;

      expect(container.firstChild).toHaveClass('inline-block rounded-full');
    });

    it('should render dot component with props.className', () => {
      const { container, rerender } = renderResult;

      rerender(<Dot {...props} className='bg-dark' />);

      expect(container.firstChild).toHaveClass('inline-block rounded-full bg-dark');
    });

    it('should renders with default size and margin', () => {
      const { container } = renderResult;

      const dot = container.firstChild;

      expect(dot).toHaveStyle('width: 25px');
      expect(dot).toHaveStyle('height: 25px');
      expect(dot).toHaveStyle(`margin: 0 7.5px`);
    });

    it('should renders with custom size and margin', () => {
      const { container, rerender } = renderResult;

      rerender(<Dot {...props} size={50} />);
      const dot = container.firstChild;

      expect(dot).toHaveStyle('width: 50px');
      expect(dot).toHaveStyle('height: 50px');
      expect(dot).toHaveStyle(`margin: 0 15px`);
    });
  });

});