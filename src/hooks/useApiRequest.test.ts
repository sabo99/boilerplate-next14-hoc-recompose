import { act, renderHook } from '@testing-library/react';

import AxiosClient from '@/services/AxiosClient';

import { useApiRequest } from './useApiRequest';

jest.mock('@/services/AxiosClient');

describe('useApiRequest', () => {
  const url = '/users';
  const method = 'GET' as any;
  const setResponse = jest.fn();
  const setLoading = jest.fn();
  const mockArgs = {
    url,
    method,
    setResponse,
    setLoading
  };
  const request = jest.fn();

  beforeEach(() => {
    (AxiosClient as jest.Mock).mockImplementation(() => ({
      getInstance: () => ({
        request
      })
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#useApiRequest', () => {
    it('should handle successful API request', async () => {
      const mockData = [{ name: 'John' }];
      const expectedResult = {
        loading: false,
        data: mockData,
        error: null
      };
      request.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useApiRequest(mockArgs));

      await act(async () => {
        const res = await result.current();
        expect(setLoading).toHaveBeenNthCalledWith(1, true);
        expect(request).toHaveBeenCalledWith({ url: '/users', method: 'GET', data: {} });
        expect(setResponse).toHaveBeenCalledWith(expectedResult);
        expect(setLoading).toHaveBeenNthCalledWith(2, false);
        expect(res).toEqual(expectedResult);
      });
    });

    it('should handle error API request', async () => {
      const message = 'User not found';
      const status = 404;
      const expectedResult = {
        loading: false,
        data: null,
        error: {
          message,
          statusCode: status,
          code: 'BAD_REQUEST'
        }
      };
      const mockError = {
        message: 'Request failed',
        response: {
          data: { message, status }
        },
        code: 'ERR_BAD_REQUEST'
      };
      request.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useApiRequest(mockArgs));

      await act(async () => {
        const res = await result.current();
        expect(setLoading).toHaveBeenNthCalledWith(1, true);
        expect(setResponse).toHaveBeenCalledWith(expectedResult);
        expect(setLoading).toHaveBeenNthCalledWith(2, false);
        expect(res).toEqual(expectedResult);
      });
    });
  });

});