import { render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';

import AppSidebar from './AppSidebar.component';

jest
  .mock('@/hooks')
  .mock('@/components/ui/sidebar', () => ({
    SidebarProvider: jest.fn(MockComponent),
    Sidebar: jest.fn(MockComponent),
    SidebarHeader: jest.fn(MockComponent),
    SidebarContent: jest.fn(MockComponent),
    SidebarFooter: jest.fn(MockComponent),
    SidebarRail: jest.fn(MockComponent)
  }))
  .mock('@/components/AppComponents/AppSidebar/AccountSwitcher', () => jest.fn(MockComponent))
  .mock('@/components/AppComponents/AppSidebar/NavMain', () => jest.fn(MockComponent))
  .mock('@/components/AppComponents/AppSidebar/NavUser', () => jest.fn(MockComponent));

describe('AppSidebar', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    permissions: ['VIEW_DASHBOARD'],
    isFilteredByPermission: true
  };

  beforeEach(() => {
    renderResult = render(
      <AppSidebar {...props}>
        Child Component
      </AppSidebar>
    );
  });

  describe('#render', () => {
    it('should render correctly with testId', () => {
      const sidebarTestId = `${screenName}_Sidebar`;
      const sidebarHeaderTestId = `${screenName}_SidebarHeader`;
      const sidebarContentTestId = `${screenName}_SidebarContent`;
      const sidebarFooterTestId = `${screenName}_SidebarFooter`;

      const { getByTestId } = renderResult;

      expect(getByTestId(sidebarTestId)).toBeTruthy();
      expect(getByTestId(sidebarHeaderTestId)).toBeTruthy();
      expect(getByTestId(sidebarContentTestId)).toBeTruthy();
      expect(getByTestId(sidebarFooterTestId)).toBeTruthy();
    });
  });
});