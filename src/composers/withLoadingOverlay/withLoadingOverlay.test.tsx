import { fireEvent, render } from '@testing-library/react';
import { compose, withState } from 'react-recompose';
import { connect } from 'react-redux';

import Providers from '@/app/provider';
import { loadingOverlayReducer } from '@/redux/reducers/LoadingOverlay';

import withLoadingOverlay from './withLoadingOverlay';

describe('withLoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const Component = ({ setShowLoadingOverlay }: any) => (
    <div>
      <p>Mock Component</p>
      <button onClick={() => setShowLoadingOverlay(true)}>Show Overlay</button>
    </div>
  );
  const WrappedComponent = compose(
    withState('showLoadingOverlay', 'setShowLoadingOverlay', false), // when using React-recompose withState
    connect(loadingOverlayReducer), // when using Redux reducer
    withLoadingOverlay()
  )(Component);

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