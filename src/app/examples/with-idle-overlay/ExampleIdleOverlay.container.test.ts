import Constants from '@/constants';

import { defaultProps, uiSettings } from './ExampleIdleOverlay.container';

const { Permissions } = Constants;

describe('ExampleIdleOverlayContainer', () => {
  describe('#defaultProps', () => {
    it('should return the correct defaultProps', () => {
      const expected = {
        screenName: 'ExampleIdleOverlay',
        pageTitle: 'Example with Idle Overlay',
        permissions: Permissions

      };

      expect(defaultProps).toEqual(expected);
    });
  });

  describe('#uiSettings', () => {
    it('should return the correct uiSettings', () => {
      const expected = {
        sidebar: true,
        overlay: {
          overlayState: 'IDLE'
        }
      };

      expect(uiSettings).toEqual(expected);
    });
  });
});