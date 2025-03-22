import { render } from '@testing-library/react';

import AppLoading from './AppLoading.component';
import { Props } from './AppLoading.types';

describe('AppLoading', () => {
  const screenName = 'TestScreen';
  describe('#render', () => {
    it('should render LoadingDots when `props` loaderType is DOTS', () => {
      const props: Props = {
        screenName,
        loaderType: 'DOTS'
      };
      const testId = `${screenName}_LoadingDots_StyledContainer`;

      const { getByTestId } = render(<AppLoading {...props} />);

      expect(getByTestId(testId)).toBeTruthy();
    });

    it('should render LoadingSpinner when `props` loaderType is SPINNER', () => {
      const props: Props = {
        screenName,
        loaderType: 'SPINNER'
      };
      const testId = `${screenName}_LoadingSpinner_StyledContainer`;

      const { getByTestId } = render(<AppLoading {...props} />);

      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});