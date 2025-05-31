import { cleanup, render } from '@testing-library/react';

import { MockComponent } from '@/__mocks__/component';

import withSidebar from './withSidebar.composer';

jest
  .mock('@/components/AppComponents/AppSidebar', () => jest.fn(MockComponent))
  .mock('@/components/AppComponents/AppSidebarInset', () => jest.fn(MockComponent))
  .mock('@/components/ui/sidebar', () => ({
    SidebarProvider: jest.fn(MockComponent)
  }));

describe('withSidebar', () => {
  let renderResult: ReturnType<typeof render>;
  const Component = (props: any) => {
    return (
      <div {...props}>
        <p>Mock Component</p>
      </div>
    );
  };
  const WrappedComponent = withSidebar()(Component);

  beforeEach(() => {
    renderResult = render(<WrappedComponent />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should renders wrapped component correctly', () => {
      const { getByText } = renderResult;

      expect(getByText('Mock Component')).toBeInTheDocument();
    });
  });
});