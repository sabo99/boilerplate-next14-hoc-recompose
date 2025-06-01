import Constants from '@/constants';

import { defaultProps, uiSettings } from './ExampleStepUpVerification.container';
const { Permissions } = Constants;

describe('ExampleStepUpVerificationContainer', () => {
  describe('#defaultProps', () => {
    it('should return the correct defaultProps', () => {
      const expected = {
        screenName: 'ExampleStepUpVerification',
        pageTitle: 'Example with Step Up Verification',
        permissions: Permissions
      };

      expect(defaultProps).toEqual(expected);
    });

    it('should return the incorrect defaultProps', () => {
      const expected = {
        screenName: 'ExampleStepUp'
      };

      expect(defaultProps).not.toEqual(expected);
    });
  });

  describe('#uiSettings', () => {
    it('should be return the correct uiSettings', () => {
      const expectedResult = {
        overlay: {
          overlayState: 'STEP_UP_VERIFICATION'
        },
        sidebar: true
      };

      expect(uiSettings).toEqual(expectedResult);
    });

    it('should be return the incorrect uiSettings', () => {
      const expectedResult = {
        sidebar: false
      };

      expect(uiSettings).not.toEqual(expectedResult);
    });
  });

});