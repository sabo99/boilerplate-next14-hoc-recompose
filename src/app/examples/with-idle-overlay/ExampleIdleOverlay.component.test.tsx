import { cleanup, render } from '@testing-library/react';

import ExampleIdleOverlay from './ExampleIdleOverlay.component';

describe('ExampleIdleOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    pageTitle: 'Example Idle Overlay',
    permissions: [],
    idleTimeout: 5000
  };

  beforeEach(() => {
    renderResult = render(
      <ExampleIdleOverlay {...props} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render with correct testId with default props and without crashing', () => {
      const cardDescriptionTestId = `${screenName}_AppBase_CardDescription`;
      const styledContainerTestId = `${screenName}_StyledContainer`;
      const styledTitleTestId = `${screenName}_StyledTitle`;
      const styledQuoteTestId = `${screenName}_StyledQuote`;
      const title = 'Detected activity includes:';
      const quote = 'Please interact with the page to stay connected.';

      const { getByTestId } = renderResult;

      expect(getByTestId(cardDescriptionTestId)).toBeTruthy();
      expect(getByTestId(styledContainerTestId)).toBeTruthy();
      expect(getByTestId(styledTitleTestId)).toBeTruthy();
      expect(getByTestId(styledTitleTestId)).toHaveTextContent(title);
      expect(getByTestId(styledQuoteTestId)).toBeTruthy();
      expect(getByTestId(styledQuoteTestId)).toHaveTextContent(quote);
    });
  });
});