import { render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';
import { SidebarProvider } from '@/components/ui/sidebar';

import AppSidebar from './AppSidebar.component';

jest.mock('@/hooks')
  .mock('@/components/AppComponents/AppSidebar/AccountSwitcher', () => MockComponent)
  .mock('@/components/AppComponents/AppSidebar/NavMain', () => MockComponent)
  .mock('@/components/AppComponents/AppSidebar/NavUser', () => MockComponent);

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
      <SidebarProvider>
        <AppSidebar {...props}>
          Child Component
        </AppSidebar>
      </SidebarProvider>
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