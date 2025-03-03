import { defaultProps, uiSettings } from './Dashboard.container';

describe('DashboardContainer', () => {

  describe('#defaultProps', () => {
    it('should return the correct defaultProps', () => {
      // Arrange
      const expected = {
        screenName: 'Dashboard',
        pageTitle: 'Dashboard',
        permissions: ['VIEW_LOADING_OVERLAY'],
        isAuthenticatedPage: true
      };
      // Act
      const result = defaultProps;
      // Assert
      expect(result).toEqual(expected);
    });
  });
  describe('#uiSettings', () => {
    it('should return the correct uiSettings', () => {
      // Arrange
      const expected = {
        sidebar: {
          isFilteredByPermission: true
        }
      };
      // Act
      const result = uiSettings;
      // Assert
      expect(result).toEqual(expected);
    });
  });
});