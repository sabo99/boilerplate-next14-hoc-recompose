import { render } from '@testing-library/react';

import Providers from '@/app/providers';

import withIdlePopupOverlay from './withIdlePopupOverlay';

describe('withIdlePopupOverlay', () => {
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isIdleOverlay: true,
    setIdleOverlay: jest.fn(),
    appAlertDialogOptions: {},
    idleTimeout: 5000
  };
  const Component = (props: any) => (
    <div data-testid='mock_component' {...props}>Mock Component</div>
  );
  const WrappedComponent = withIdlePopupOverlay()(Component);

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#render', () => {
    it('should render Overlay with idlePopup when isIdleOverlay is true', () => {
      const testId = 'mock_component';

      const { getByTestId } = render(
        <Providers>
          <WrappedComponent {...props} />
        </Providers>
      );

      expect(getByTestId(testId)).toBeTruthy();
      expect(getByTestId(testId)).toHaveAttribute('idleTimeout', '5000');
      expect(getByTestId(testId)).toHaveAttribute('screenName', screenName);
    });
  });

});