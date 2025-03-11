import { render } from '@testing-library/react';

import { SidebarProvider } from '@/components/ui/sidebar';

import AppSidebar from './AppSidebar.component';

jest.mock('@/hooks');
const screenName = 'TestScreen';

describe('AppSidebar', () => {
  let renderResult: ReturnType<typeof render>;
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

      const { getByTestId, debug } = renderResult;
      debug();

      expect(getByTestId(sidebarTestId)).toBeTruthy();
    });
  });
});