import { cleanup, render } from '@testing-library/react';

import { accounts } from '@/fixtures';

import AccountInfo from './AccountInfo.component';

describe('AccountInfo', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestPage';
  const props = {
    screenName,
    user: accounts[0]
  };

  beforeEach(() => {
    renderResult = render(
      <AccountInfo {...props} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {

    it('should render component with testId correctly', () => {
      const userNameTestId = `${screenName}_StyledUserName`;
      const userEmailTestId = `${screenName}_StyledUserEmail`;

      const { getByTestId } = renderResult;

      expect(getByTestId(userNameTestId)).toBeTruthy();
      expect(getByTestId(userNameTestId)).toHaveTextContent(props.user.name);
      expect(getByTestId(userEmailTestId)).toBeTruthy();
      expect(getByTestId(userEmailTestId)).toHaveTextContent(props.user.email);
    });

    it('should render icon when icon is provide', () => {
      const icon = <div>Mock Icon</div>;
      const mockProps = {
        ...props,
        icon
      };

      const { getByText, rerender } = renderResult;
      rerender(<AccountInfo {...mockProps} />);

      expect(getByText('Mock Icon')).toBeTruthy();
    });

  });
});