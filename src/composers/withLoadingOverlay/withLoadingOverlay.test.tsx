import { render } from '@testing-library/react';

import Providers from '@/app/providers';

import withLoadingOverlay from './withLoadingOverlay';

describe('withLoadingOverlay', () => {
  const screenName = 'TestScreen';
  const props = {
    screenName,
    isLoadingOverlay: true,
    loaderType: 'DOTS'
  };
  const ComponentWithLoadingDots = (props: any) => (
    <>
      <div data-testid='mock_component' {...props}>Mock Component</div>
      <div>LoadingDots</div>
    </>
  );
  const ComponentWithLoadingSpinner = (props: any) => (
    <>
      <div data-testid='mock_component' {...props}>Mock Component</div>
      <div>LoadingSpinner</div>
    </>
  );

  describe('#render', () => {
    it('should render Overlay with LoadingDots when isLoadingOverlay is true and loaderType is DOTS', () => {
      const testId = 'mock_component';
      const WrappedComponent = withLoadingOverlay()(ComponentWithLoadingDots);

      const { getByTestId } = render(
        <Providers>
          <WrappedComponent {...props} />
        </Providers>
      );

      expect(getByTestId(testId)).toBeTruthy();
      expect(getByTestId(testId)).toHaveAttribute('screenName', screenName);
      expect(getByTestId(testId)).toHaveAttribute('loaderType', 'DOTS');
    });

    it('should render Overlay with LoadingDots when isLoadingOverlay is true and loaderType is DOTS', () => {
      const testId = 'mock_component';
      const mockProps = {
        ...props,
        loaderType: 'SPINNER'
      };
      const WrappedComponent = withLoadingOverlay()(ComponentWithLoadingSpinner);

      const { getByTestId } = render(
        <Providers>
          <WrappedComponent {...mockProps} />
        </Providers>
      );

      expect(getByTestId(testId)).toBeTruthy();
      expect(getByTestId(testId)).toHaveAttribute('screenName', screenName);
      expect(getByTestId(testId)).toHaveAttribute('loaderType', 'SPINNER');
    });
  });
});