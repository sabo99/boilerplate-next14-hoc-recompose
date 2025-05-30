import { throwIfMissing } from '@sabo99/node-utils';

import type { ApiCallOptions, AuthServiceOptions, AxiosApiOptions } from '@/types';

/**
 * Provides authentication-related API endpoints.
 *
 * @remarks
 * This class encapsulates methods for authentication requests.
 */
class AuthService {
  private readonly apiOptions!: AxiosApiOptions;

  constructor(readonly options: AuthServiceOptions) {
    throwIfMissing(options, 'options required');
    throwIfMissing(options.apiOptions, 'options.apiOptions required');

    Object.assign(this, options);
  }

  loginByUsernamePassword(): ApiCallOptions {
    return {
      url: '/auth/login',
      method: 'POST',
      options: this.apiOptions
    };
  }
}

export default AuthService;