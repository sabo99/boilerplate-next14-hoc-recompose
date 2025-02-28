import { fireEvent, render } from '@testing-library/react';

import Providers from '@/app/providers';

import withLoadingOverlay from './withLoadingOverlay';

describe('withLoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const options = {
    enabledLoadingOverlay: true,
    setLoadingOverlay: jest.fn()
  };
  const Component = (options: any) => (
    <div>
      <p>Mock Component</p>
      <button onClick={() => options.setLoadingOverlay(true)}>Show Overlay</button>
    </div>
  );
  // const WrappedComponent = compose(
  //   withState('showLoadingOverlay', 'setShowLoadingOverlay', false), // when using React-recompose withState
  //   connect(loadingOverlayReducer), // when using Redux reducer
  //   withLoadingOverlay()
  // )(Component);

  const WrappedComponent = withLoadingOverlay(options)(Component);

  beforeEach(() => {
    renderResult = render(
      // ⚠️ Required add Providers when using Redux
      <Providers>
        <WrappedComponent />
      </Providers>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders wrapped component correctly', () => {
    const { getByText } = renderResult;

    expect(getByText('Mock Component')).toBeInTheDocument();
  });

  it('should does not show LoadingOverlay by default or when state is false', () => {
    const { queryByTestId } = renderResult;

    expect(queryByTestId('LoadingOverlay')).not.toBeInTheDocument();
  });

  it('should show LoadingOverlay when state is true', () => {
    const { getByRole, queryByTestId } = renderResult;

    const button = getByRole('button', { name: /show overlay/i });
    fireEvent.click(button);

    expect(queryByTestId('LoadingOverlay')).toBeTruthy();
  });
});