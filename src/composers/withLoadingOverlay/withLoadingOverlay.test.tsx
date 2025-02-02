import { fireEvent,render } from '@testing-library/react';

import withLoadingOverlay from './withLoadingOverlay';

describe('withLoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const Component = ({ setShowLoadingOverlay }: any) => (
    <div>
      <p>Mock Component</p>
      <button onClick={() => setShowLoadingOverlay(true)}>Show Overlay</button>
    </div>
  );
  const WrappedComponent = withLoadingOverlay()(Component);

  beforeEach(() => {
    renderResult = render(<WrappedComponent />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders wrapped component correctly', () => {
    const { getByText } = renderResult;

    expect(getByText('Mock Component')).toBeInTheDocument();
  });

  it('should does not show LoadingOverlay by default', () => {
    const { queryByTestId } = renderResult;

    expect(queryByTestId('LoadingOverlay')).not.toBeInTheDocument();
  });

  it('should show LoadingOverlay when state is true', async () => {
    const { getByRole, queryByTestId } = renderResult;

    const button = getByRole('button', { name: /show overlay/i });
    await fireEvent.click(button);

    expect(queryByTestId('LoadingOverlay')).toBeTruthy();
  });

  it('should hide LoadingOverlay when state is false', () => {
    const { queryByTestId } = renderResult;

    expect(queryByTestId('LoadingOverlay')).toBeFalsy();
  });
});