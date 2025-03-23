import { fireEvent, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';
import { accounts } from '@/fixtures';

import AccountSwitcher from './AccountSwitcher.component';

jest
  .mock('@/components/ui/sidebar', () => ({
    SidebarMenuButton: jest.fn(MockComponent),
    SidebarMenu: jest.fn(MockComponent),
    SidebarMenuItem: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: jest.fn(MockComponent),
    DropdownMenuContent: jest.fn(MockComponent),
    DropdownMenuItem: jest.fn(MockComponent),
    DropdownMenuLabel: jest.fn(MockComponent),
    DropdownMenuSeparator: jest.fn(MockComponent),
    DropdownMenuShortcut: jest.fn(MockComponent),
    DropdownMenuTrigger: jest.fn(MockComponent)
  }));

describe('AccountSwitcher', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isMobile: false,
    accounts
  };

  beforeEach(() => {
    renderResult = render(
      <AccountSwitcher {...props} />
    );
  });
  describe('#render', () => {
    it('should render component with correctly testId', () => {
      const sidebarMenuTestId = `${screenName}_SidebarMenu`;
      const dropdownMenuItemTestId = `${screenName}_DropdownMenuItem_0`;
      const activeAccountNameTestId = `${screenName}_ActiveAccountName`;
      const activeAccountGroupIdTestId = `${screenName}_ActiveAccountGroupID`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(sidebarMenuTestId)).toBeTruthy();
      expect(getByTestId(dropdownMenuItemTestId)).toBeTruthy();
      expect(getByTestId(activeAccountNameTestId)).toBeTruthy();
      expect(getByTestId(activeAccountNameTestId)).toHaveTextContent(accounts[0].name);
      expect(getByTestId(activeAccountGroupIdTestId)).toBeTruthy();
      expect(getByTestId(activeAccountGroupIdTestId)).toHaveTextContent(accounts[0].groupId);
      expect(getByText('Accounts')).toBeTruthy();

    });

    it('should render StyledDropdownMenuContent with side `right` when isMobile is false', () => {
      const styledDropdownMenuContentId = `${screenName}_StyledDropdownMenuContent`;
      const { getByTestId } = renderResult;

      expect(getByTestId(styledDropdownMenuContentId)).toBeTruthy();
      expect(getByTestId(styledDropdownMenuContentId)).toHaveAttribute('side', 'right');
    });

    it('should render StyledDropdownMenuContent with side `bottom` when isMobile is true', () => {
      const styledDropdownMenuContentId = `${screenName}_StyledDropdownMenuContent`;
      const mockProps = {
        ...props,
        isMobile: true
      };

      const { getByTestId, rerender } = renderResult;
      rerender(
        <AccountSwitcher {...mockProps} />
      );

      expect(getByTestId(styledDropdownMenuContentId)).toBeTruthy();
      expect(getByTestId(styledDropdownMenuContentId)).toHaveAttribute('side', 'bottom');
    });

  });

  describe('#onClick', () => {
    it('should switch to the selected account when a different `DropdownMenuItem` is clicked', () => {
      const index = 1;
      const dropdownMenuItemTestId = `${screenName}_DropdownMenuItem_${index}`;
      const activeAccountNameTestId = `${screenName}_ActiveAccountName`;
      const activeAccountGroupIdTestId = `${screenName}_ActiveAccountGroupID`;

      const { getByTestId } = renderResult;
      fireEvent.click(getByTestId(dropdownMenuItemTestId));

      expect(getByTestId(activeAccountNameTestId)).toBeTruthy();
      expect(getByTestId(activeAccountNameTestId)).toHaveTextContent(accounts[index].name);
      expect(getByTestId(activeAccountGroupIdTestId)).toBeTruthy();
      expect(getByTestId(activeAccountGroupIdTestId)).toHaveTextContent(accounts[index].groupId);
    });
  });
});
