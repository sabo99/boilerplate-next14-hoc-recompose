import { cleanup, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';
import { accounts } from '@/fixtures';

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
    user: accounts[0]
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
});