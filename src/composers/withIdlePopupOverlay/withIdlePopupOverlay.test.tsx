import { render } from '@testing-library/react';

import Providers from '@/app/providers';

import withIdlePopupOverlay from './withIdlePopupOverlay';

jest
  .mock('@/hooks', () => ({
    useRouter: () => ({
      replace: jest.fn()
    }),
    useIdleTimer: () => ({
      pause: jest.fn(),
      activate: jest.fn()
    })
  }))
  .mock('./withIdlePopupOverlay.config', () => ({
    __esModule: true,
    default: {
      defaultProps: {
        idleTimeout: 5000,
        popupTimeout: 30000
      }
    }
  }));

describe('withIdlePopupOverlay', () => {
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isIdlePopupOverlay: true,
    setIdlePopupOverlay: jest.fn()
  };
  const Component = (props: any) => (
    <div data-testid='mock_component' {...props}>Mock Component</div>
  );
  const WrappedComponent = withIdlePopupOverlay()(Component);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render AppIdleSession with props', () => {
      const testId = 'mock_component';

      const { getByTestId } = render(
        <Providers>
          <WrappedComponent {...props} />
        </Providers>
      );

      expect(getByTestId(testId)).toBeTruthy();
      expect(getByTestId(testId)).toHaveAttribute('screenName', screenName);
      expect(getByTestId(testId)).toHaveAttribute('idleTimeout', '5000');
      expect(getByTestId(testId)).toHaveAttribute('popupTimeout', '30000');
    });
  });

});