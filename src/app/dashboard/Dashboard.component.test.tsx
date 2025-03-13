import { cleanup, render } from '@testing-library/react';

import Dashboard from './Dashboard.component';

describe('Dashboard', () => {
  let renderResult: ReturnType<typeof render>;

  beforeEach(()=>{
    renderResult = render(<Dashboard />);
  });

  afterEach(()=>{
    cleanup();
  jest.clearAllMocks();
  });
  describe('#render', () => {
    it('should render Dashboard with correctly testId', () => {
      const contentTestId = 'Content';

      const { getByTestId } = renderResult;

      expect(getByTestId(contentTestId)).toBeTruthy();
    });
  });
});