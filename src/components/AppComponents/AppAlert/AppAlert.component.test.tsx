import { render } from '@testing-library/react';
import { AlertCircleIcon } from 'lucide-react';

import AppAlert from './AppAlert.component';

describe('AppAlert', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    title: 'Test Title',
    message: 'Test Message',
    variant: 'default'
  };

  beforeEach(() => {
    renderResult = render(<AppAlert {...props as any} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render the component with props', () => {
      const alertTestId = `${screenName}_StyledAlert`;
      const alertTitleTestId = `${screenName}_AlertTitle`;
      const alertDescTestId = `${screenName}_AlertTitle`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(alertTestId)).toBeTruthy();
      expect(getByTestId(alertTitleTestId)).toBeTruthy();
      expect(getByTestId(alertDescTestId)).toBeTruthy();
      expect(getByText(props.title)).toBeTruthy();
      expect(getByText(props.message)).toBeTruthy();
      expect(getByTestId(alertTestId)).toHaveClass('w-[400px] max-w-full self-center');
    });
    it('should render the component with Icon when props.Icon is present', () => {
      const iconTestId = `${screenName}_StyledIcon`;
      const mockProps = {
        ...props,
        icon: AlertCircleIcon
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<AppAlert {...mockProps as any} />);

      expect(getByTestId(iconTestId)).toBeTruthy();
      expect(getByTestId(iconTestId)).toHaveClass('h-4 w-4');
    });

    it('should render the component with custom className', () => {
      const alertTestId = `${screenName}_StyledAlert`;
      const className = 'w-[200px] max-w-full self-center';
      const mockProps = {
        ...props,
        className
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<AppAlert {...mockProps as any} />);

      expect(getByTestId(alertTestId)).toHaveClass(className);
    });

  });
});