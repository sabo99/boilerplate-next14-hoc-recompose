import Constants from '@/constants';

import { defaultProps, uiSettings } from './Dashboard.container';

const { Permissions } = Constants;

describe('DashboardContainer', () => {

  describe('#defaultProps', () => {
    it('should return the correct defaultProps', () => {
      // Arrange
      const expected = {
        screenName: 'Dashboard',
        pageTitle: 'Dashboard',
        permissions: Permissions
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
        sidebar: true
      };
      // Act
      const result = uiSettings;
      // Assert
      expect(result).toEqual(expected);
    });
  });
});