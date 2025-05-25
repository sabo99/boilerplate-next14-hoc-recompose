import { render } from '@testing-library/react';

import { LoadingTypeOptions } from '@/composers/withLoadingOverlay/withLoadingOverlay.types';

import LoadingOverlay from './LoadingOverlay.component';

describe('LoadingOverlay', () => {
  let renderResult: ReturnType<typeof render>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    loaderType: 'SPINNER' as LoadingTypeOptions,
    isLoadingOverlay: false
  };

  describe('#render', () => {
    it('should not render component when isLoadingOverlay is false', () => {
      const overlayStyledContainerTestId = `${screenName}_Overlay_StyledContainer`;

      const { queryByTestId } = render(<LoadingOverlay {...props} />);

      expect(queryByTestId(overlayStyledContainerTestId)).toBeFalsy();
    });

    it('should render component with Loading Spinner when loaderType is `SPINNER`', () => {
      const overlayStyledContainerTestId = `${screenName}_Overlay_StyledContainer`;
      const overlayStyledContentTestId = `${screenName}_Overlay_StyledContent`;
      const loadingStyledContainerTestId = `${screenName}_LoadingSpinner_StyledContainer`;
      const loadingStyledContentTestId = `${screenName}_LoadingSpinner_StyledSpinner`;

      const { getByTestId } = render(
        <LoadingOverlay {...props} loaderType="SPINNER" isLoadingOverlay />
      );

      expect(getByTestId(overlayStyledContainerTestId)).toBeTruthy();
      expect(getByTestId(overlayStyledContentTestId)).toBeTruthy();
      expect(getByTestId(loadingStyledContainerTestId)).toBeTruthy();
      expect(getByTestId(loadingStyledContentTestId)).toBeTruthy();
    });

    it('should render component with Loading Dots when loaderType is `DOTS`', () => {
      const overlayStyledContainerTestId = `${screenName}_Overlay_StyledContainer`;
      const overlayStyledContentTestId = `${screenName}_Overlay_StyledContent`;
      const loadingStyledContainerTestId = `${screenName}_LoadingDots_StyledContainer`;
      const loadingStyledContentTestId = `${screenName}_LoadingDots_first_Dot`;

      const { getByTestId } = render(
        <LoadingOverlay {...props} loaderType="DOTS" isLoadingOverlay />
      );

      expect(getByTestId(overlayStyledContainerTestId)).toBeTruthy();
      expect(getByTestId(overlayStyledContentTestId)).toBeTruthy();
      expect(getByTestId(loadingStyledContainerTestId)).toBeTruthy();
      expect(getByTestId(loadingStyledContentTestId)).toBeTruthy();
    });

  });
});