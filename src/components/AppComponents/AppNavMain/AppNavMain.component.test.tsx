import { cleanup, render } from '@testing-library/react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { navMainItemData } from '@/fixtures';

import AppNavMain from './AppNavMain.component';

jest.mock('@/hooks');

describe('AppNavMain', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestPage';
  const props = {
    screenName,
    items: navMainItemData
  };

  beforeEach(() => {
    renderResult = render(
      <SidebarProvider {...{ 'data-testid': `${screenName}_SidebarProvider` }}>
        <AppNavMain {...props as any} />
      </SidebarProvider>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  describe('#render', () => {
    it('should render component with testId correctly', () => {
      const sidebarGroupTestId = `${screenName}_SidebarGroup`;
      const sidebarGroupLabelTestId = `${screenName}_SidebarGroupLabel`;
      const sidebarMenuTestId = `${screenName}_SidebarMenu`;

      const { getByTestId } = renderResult;

      expect(getByTestId(sidebarGroupTestId)).toBeTruthy();
      expect(getByTestId(sidebarGroupLabelTestId)).toBeTruthy();
      expect(getByTestId(sidebarGroupLabelTestId)).toHaveTextContent('HOCs with Recompose');
      expect(getByTestId(sidebarMenuTestId)).toBeTruthy();
    });
  });
});