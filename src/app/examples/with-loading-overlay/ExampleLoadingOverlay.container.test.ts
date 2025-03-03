import { defaultProps, stateList, uiSettings } from './ExampleLoadingOverlay.container';

describe('ExampleLoadingOverlayContainer', () => {

  describe('#defaultProps', () => {
    it('should be return the correct defaultProps', () => {
      const expectedResult = {
        screenName: 'ExampleLoadingOverlay',
        pageTitle: 'Example with Loading Overlay',
        permissions: ['VIEW_LOADING_OVERLAY'],
        isAuthenticatedPage: true
      };

      expect(defaultProps).toEqual(expectedResult);
    });
    it('should be return the incorrect defaultProps', () => {
      const expectedResult = {
        screenName: 'ExampleLoadingOverlay',
        pageTitle: 'Example with Loading Overlay',
        permissions: ['VIEW_LOADING_OVERLAY']
      };

      expect(defaultProps).not.toEqual(expectedResult);
    });
  });

  describe('#stateList', () => {
    it('should be return the correct stateList', () => {
      const expectedResult = [
        ['messages', 'setMessages', ['default message...']],
        ['progress', 'setProgress', 0]
      ];

      expect(stateList).toEqual(expectedResult);
    });
    it('should be return the incorrect stateList', () => {
      const expectedResult = [
        ['messages', 'setMessages', ['default message...']]
      ];

      expect(stateList).not.toEqual(expectedResult);
    });
  });

  describe('#uiSettings', () => {
    it('should be return the correct uiSettings', () => {
      const expectedResult = {
        sidebar: {
          isFilteredByPermission: true
        },
        overlay: {
          overlayState: 'LOADING',
          loaderType: 'DOTS'
        }
      };

      expect(uiSettings).toEqual(expectedResult);
    });
    it('should be return the incorrect uiSettings', () => {
      const expectedResult = {
        screenConfig: {
          screenName: 'ExampleLoadingOverlay',
          pageTitle: 'Example with Loading Overlay'
        }
      };

      expect(uiSettings).not.toEqual(expectedResult);
    });
  });
});