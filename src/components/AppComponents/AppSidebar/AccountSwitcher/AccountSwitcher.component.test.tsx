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
    accounts,
    activeAccount: accounts[0],
    setActiveAccount: jest.fn()
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

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(sidebarMenuTestId)).toBeTruthy();
      expect(getByTestId(dropdownMenuItemTestId)).toBeTruthy();
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

    it('should render UserRoundCheckIcon for the active account', () => {
      const iconTestId = `${screenName}_UserRoundCheckIcon`;

      const { getByTestId } = renderResult;

      expect(getByTestId(iconTestId)).toBeTruthy();
    });

    it('should render description "Account has maximum extended" when accounts reach the maximum limit', () => {
      const description = 'Account has maximum extended';

      const { getByText } = renderResult;

      expect(getByText(description)).toBeTruthy();
    });

    it('should render "Add Account" description when accounts are not at maximum limit', () => {
      const description = 'Add Account';
      const mockProps = {
        ...props,
        accounts: []
      };

      const { getByText, rerender } = renderResult;
      rerender(<AccountSwitcher {...mockProps} />);

      expect(getByText(description)).toBeTruthy();
    });
  });

  describe('#onClick', () => {
    it('should invoke setActiveAccount when selected another account', async () => {
      const index = 2;
      const dropdownMenuItemSelectedTestId = `${screenName}_DropdownMenuItem_${index}`;

      const { getByTestId } = renderResult;
      fireEvent.click(getByTestId(dropdownMenuItemSelectedTestId));

      expect(props.setActiveAccount).toHaveBeenCalledWith(accounts[index]);
    });
  });
});
