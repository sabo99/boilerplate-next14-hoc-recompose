import { cleanup } from '@testing-library/react';

import withAxiosApi from '../withAxiosApi';
import withLoadingOverlayModule from '../withLoadingOverlay';
import withAxiosApiLifecycle from './withAxiosApiLifecycle';
import type { Options } from './withAxiosApiLifecycle.types';

jest.mock('react-recompose')
  .mock('../withAxiosApi')
  .mock('../withLoadingOverlay');

describe('withAxiosApiLifecycle', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#withLoadingOverlay', () => {
    it('should invoke withLoadingOverlay by default', () => {
      const options: Options = {
        apiOptions: [
          {
            method: 'GET',
            url: '/products',
            mapProps: jest.fn()
          }
        ]
      };

      withAxiosApiLifecycle(options);

      expect(withLoadingOverlayModule).toHaveBeenCalledTimes(1);
    });
  });

  describe('#withAxiosApi', () => {
    it('should invoke withAxiosApi when `options` apiOptions is present', () => {
      const options: Options = {
        apiOptions: [
          {
            url: '/products',
            method: 'GET',
            mapProps: jest.fn(),
            options: {
              skipApiOnRender: true,
              params: { limit: 10 }
            }
          },
          {
            url: '/users',
            method: 'GET',
            mapProps: jest.fn(),
            options: {
              headers: { 'Content-Type': 'application/json' }
            }
          }
        ]
      };

      withAxiosApiLifecycle(options);

      expect(withAxiosApi).toHaveBeenNthCalledWith(1, options.apiOptions[0]);
      expect(withAxiosApi).toHaveBeenNthCalledWith(2, options.apiOptions[1]);
    });
  });
});
