import { cleanup, render } from '@testing-library/react';

import { accounts } from '@/fixtures';

import AccountInfo from './AccountInfo.component';
import AccountInfoConfig from './AccountInfo.config';

const { componentName } = AccountInfoConfig;

describe('AccountInfo', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestPage';
  const testId = `${screenName}_${componentName}`;
  const user = accounts[0];
  const props = {
    screenName,
    user
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
      const userFullNameTestId = `${testId}_StyledUserFullName`;
      const userEmailTestId = `${testId}_StyledUserEmail`;
      const fullName = `${user.firstName} ${user.lastName}`;

      const { getByTestId } = renderResult;

      expect(getByTestId(userFullNameTestId)).toBeTruthy();
      expect(getByTestId(userFullNameTestId)).toHaveTextContent(fullName);
      expect(getByTestId(userEmailTestId)).toBeTruthy();
      expect(getByTestId(userEmailTestId)).toHaveTextContent(user.email);
    });

    it('should render with pre-condition when user is undefined', () => {
      const userFullNameTestId = `${testId}_StyledUserFullName`;
      const userEmailTestId = `${testId}_StyledUserEmail`;
      const fullName = 'Guest';
      const email = '-';
      const mockProps = {
        ...props,
        user: undefined
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<AccountInfo {...mockProps} />);

      expect(getByTestId(userFullNameTestId)).toBeTruthy();
      expect(getByTestId(userFullNameTestId)).toHaveTextContent(fullName);
      expect(getByTestId(userEmailTestId)).toBeTruthy();
      expect(getByTestId(userEmailTestId)).toHaveTextContent(email);
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