import { cleanup } from '@testing-library/react';

import withAxiosApi from '@/composers/withAxiosApi';
import withLoadingOverlay from '@/composers/withLoadingOverlay';

import withAxiosApiLifecycle from './withAxiosApiLifecycle.composer';

jest.mock('react-recompose')
  .mock('@/composers/withAxiosApi')
  .mock('@/composers/withLoadingOverlay');

describe('withAxiosApiLifecycle', () => {

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('#withLoadingOverlay', () => {
    it('should invoke withLoadingOverlay when `loadingOverlay` is true', () => {
      const options: any = {
        loadingOverlay: true,
        apiRequests: [
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

  });

  describe('#withAxiosApi', () => {
    it('should invoke withAxiosApi when `apiRequests` is present', () => {
      const options: any = {
        apiRequests: [
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

      expect(withAxiosApi).toHaveBeenNthCalledWith(1, options.apiRequests[0]);
      expect(withAxiosApi).toHaveBeenNthCalledWith(2, options.apiRequests[1]);
    });
  });
});
