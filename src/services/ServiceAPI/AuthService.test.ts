import { AuthServiceOptions } from '@/types';

import AuthService from './AuthService';

describe('AuthService', () => {
  const apiOptions = {
    headers: { 'Content-Type': 'application/json' },
    skipApiOnRender: true
  };
  const mockArgs: AuthServiceOptions = {
    apiOptions
  };
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService(mockArgs);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#loginByUsernamePassword', () => {
    it('should return api call options result', () => {
      const expectedResult = {
        url: '/auth/login',
        method: 'POST',
        options: apiOptions
      };

      const result = service.loginByUsernamePassword();

      expect(result).toEqual(expectedResult);
    });
  });

});