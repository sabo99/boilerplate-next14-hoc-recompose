import { render } from '@testing-library/react';

import Providers from '@/app/providers';

import withLoadingOverlay from './withLoadingOverlay';

describe('withLoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const props = {
    screenName: 'TestScreen',
    loaderType: 'DOTS',
    isLoadingOverlay: true
  };
  const Component = (props: any) => {
    return (
      <div {...props}>
        <p>Mock Component</p>
      </div>
    );
  };
  const WrappedComponent = withLoadingOverlay()(Component);

  beforeEach(() => {
    renderResult = render(
      <Providers>
        <WrappedComponent {...props} />
      </Providers>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should renders wrapped component correctly', () => {
      const { getByText } = renderResult;

      expect(getByText('Mock Component')).toBeInTheDocument();
    });
  });
});