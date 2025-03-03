import { cleanup, fireEvent, render } from '@testing-library/react';

import Providers from '@/app/providers';

import withOverlay from './withOverlay';

describe('withOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const options: any = {
    screenName: 'TestScreen',
    overlayState: 'LOADING',
    loaderType: 'DOTS'
  };
  const Component = (props: any) => (
    <div>
      <p>Mock Component</p>
      <button onClick={() => props.setLoadingOverlay(true)}>Show Overlay</button>
    </div>
  );
  // const WrappedComponent = compose(
  //   withState('showLoadingOverlay', 'setShowLoadingOverlay', false), // when using React-recompose withState
  //   connect(loadingOverlayReducer), // when using Redux reducer
  //   withOverlay()
  // )(Component);

  const WrappedComponent = withOverlay(options)(Component);

  beforeEach(() => {
    renderResult = render(
      // ⚠️ Required add Providers when using Redux
      <Providers>
        <WrappedComponent />
      </Providers>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should renders wrapped component correctly', () => {
    const { getByText } = renderResult;

    expect(getByText('Mock Component')).toBeInTheDocument();
  });

  it('should not called Overlay by default or when isOpen (isLoadingOverlay or isIdleOverlay) is false', () => {
    const { queryByTestId } = renderResult;

    expect(queryByTestId('TestScreen_Overlay_StyledContainer')).not.toBeInTheDocument();
  });

  it('should called Overlay when isOpen (isLoadingOverlay or isIdleOverlay) is true', () => {
    const { getByRole, queryByTestId } = renderResult;

    const button = getByRole('button', { name: /show overlay/i });
    fireEvent.click(button);

    expect(queryByTestId('TestScreen_Overlay_StyledContainer')).toBeTruthy();
  });
});