import { cleanup } from '@testing-library/react';

import withAxiosApi from '@/composers/withAxiosApi';
import withLoadingOverlay from '@/composers/withLoadingOverlay';
import withLoadingOverlayConfig from '@/composers/withLoadingOverlay/withLoadingOverlay.config';

import withAxiosApiLifecycle from './withAxiosApiLifecycle';
import type { Options } from './withAxiosApiLifecycle.types';

jest.mock('react-recompose')
  .mock('@/composers/withAxiosApi')
  .mock('@/composers/withLoadingOverlay')
  .mock('@/composers/withLoadingOverlay/withLoadingOverlay.config');

describe('withAxiosApiLifecycle', () => {

  const { withLoadingOverlayState } = withLoadingOverlayConfig;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#withLoadingOverlay', () => {
    it('should invoke withLoadingOverlay by default', () => {
      const options: Options = {
        loadingOverlay: true,
        apiOptions: [
          {
            method: 'GET',
            url: '/products',
            mapProps: jest.fn()
          }
        ]
      };

      withAxiosApiLifecycle(options);

      expect(withLoadingOverlay).toHaveBeenCalledTimes(1);
    });

    it('should invoke withLoadingOverlayState when loadingOverlay is false', () => {
      const options: Options = {
        loadingOverlay: false,
        apiOptions: [
          {
            method: 'GET',
            url: '/products',
            mapProps: jest.fn()
          }
        ]
      };

      withAxiosApiLifecycle(options);

      expect(withLoadingOverlayState).toHaveBeenCalled();
    });
  });

  describe('#withAxiosApi', () => {
    it('should invoke withAxiosApi when `options` apiOptions is present', () => {
      const options: Options = {
        loadingOverlay: true,
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
