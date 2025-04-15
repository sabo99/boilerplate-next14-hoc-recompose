import { cleanup, fireEvent, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';
import { accounts, session } from '@/fixtures';

import NavUser from './NavUser.component';

jest
  .mock('@/hooks')
  .mock('@/components/ui/sidebar', () => ({
    SidebarProvider: jest.fn(MockComponent),
    SidebarMenu: jest.fn(MockComponent),
    SidebarMenuItem: jest.fn(MockComponent),
    SidebarMenuButton: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: jest.fn(MockComponent),
    DropdownMenuContent: jest.fn(MockComponent),
    DropdownMenuGroup: jest.fn(MockComponent),
    DropdownMenuItem: jest.fn(MockComponent),
    DropdownMenuLabel: jest.fn(MockComponent),
    DropdownMenuSeparator: jest.fn(MockComponent),
    DropdownMenuTrigger: jest.fn(MockComponent)
  }));

describe('NavUser', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isMobile: true,
    accounts,
    session,
    activeAccount: accounts[0],
    setSelectedRelogAccount: jest.fn(),
    setSession: jest.fn(),
    setActiveAccount: jest.fn(),
    setAccounts: jest.fn(),
    clearSession: jest.fn(),
    clearAllSession: jest.fn(),
    clearSelectedRelogAccount: jest.fn()
  };

  beforeEach(() => {
    renderResult = render(
      <NavUser {...props} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render DropdownMenuContent with side `bottom` when isMobile is true', () => {
      const dropdownMenuContentTestId = `${screenName}_DropdownMenuContent`;

      const { getByTestId } = renderResult;

      expect(getByTestId(dropdownMenuContentTestId)).toBeTruthy();
      expect(getByTestId(dropdownMenuContentTestId)).toHaveAttribute('side', 'bottom');
    });

    it('should render DropdownMenuContent with side `right` when isMobile is false', () => {
      const dropdownMenuContentTestId = `${screenName}_DropdownMenuContent`;
      const mockProps = {
        ...props,
        isMobile: false
      };

      const { getByTestId, rerender } = renderResult;
      rerender(<NavUser {...mockProps} />);

      expect(getByTestId(dropdownMenuContentTestId)).toBeTruthy();
      expect(getByTestId(dropdownMenuContentTestId)).toHaveAttribute('side', 'right');
    });
  });

  describe('#onClick', () => {
    it('should called clearSession when LogoutButton is clicked', () => {
      const buttonTestId = `${screenName}_LogoutButton`;

      const { getByTestId } = renderResult;
      fireEvent.click(getByTestId(buttonTestId));

      expect(props.clearSession).toHaveBeenCalled();
    });
  });
});