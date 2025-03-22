import { cleanup, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';

import AppSidebarInset from './AppSidebarInset.component';

jest
  .mock('@/hooks')
  .mock('@/components/ui/sidebar', () => ({
    SidebarProvider: jest.fn(MockComponent),
    SidebarInset: jest.fn(MockComponent),
    SidebarTrigger: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/breadcrumb', () => ({
    BreadcrumbItem: jest.fn(MockComponent),
    BreadcrumbSeparator: jest.fn(MockComponent),
    Breadcrumb: jest.fn(MockComponent),
    BreadcrumbLink: jest.fn(MockComponent),
    BreadcrumbList: jest.fn(MockComponent),
    BreadcrumbPage: jest.fn(MockComponent)
  }))
  .mock('@/components/ui/separator', () => ({
    Separator: jest.fn(MockComponent)
  }));

describe('AppSidebarInset', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const children = <div>Mock Component</div>;
  const props = {
    screenName,
    pageTitle: 'PageTitle',
    children
  };

  beforeEach(() => {
    renderResult = render(
      <AppSidebarInset {...props} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render component with testId correctly', () => {
      const sidebarInsertTestId = `${screenName}_SidebarInset`;
      const styledHeaderTestId = `${screenName}_StyledHeader`;
      const styledHeaderContentTestId = `${screenName}_StyledHeaderContent`;
      const sidebarTriggerTestId = `${screenName}_SidebarTrigger`;
      const pageTitleTestId = `${screenName}_PageTitle`;

      const { getByTestId, getByText } = renderResult;

      expect(getByTestId(sidebarInsertTestId)).toBeTruthy();
      expect(getByTestId(styledHeaderTestId)).toBeTruthy();
      expect(getByTestId(styledHeaderContentTestId)).toBeTruthy();
      expect(getByTestId(sidebarTriggerTestId)).toBeTruthy();
      expect(getByTestId(pageTitleTestId)).toBeTruthy();
      expect(getByTestId(pageTitleTestId)).toHaveTextContent('PageTitle');
      expect(getByText('PageTitle')).toBeTruthy();
      expect(getByText('Boilerplate Next14 HOCs Recompose')).toBeTruthy();
      expect(getByText('Mock Component')).toBeTruthy();
    });
  });
});
