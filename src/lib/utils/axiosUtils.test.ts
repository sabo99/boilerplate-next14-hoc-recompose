import { AxiosError, AxiosInstance } from 'axios';

import { createSendRequest } from '@/lib/utils';

describe('axiosUtils', () => {
  const axiosClientInstance: Partial<AxiosInstance> = {
    request: jest.fn()
  };
  const setResponse = jest.fn();
  const setLoadingOverlay = jest.fn();
  const headers = {
    'Content-Type': 'application/json'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createSendRequest', () => {
    const params = {
      axiosClientInstance: axiosClientInstance as AxiosInstance,
      url: '/login',
      method: 'POST',
      setResponse,
      setLoadingOverlay
    };

    it('should handle successful response and update state correctly', async () => {
      const expectedResult = {
        loading: false,
        data: { foo: 'bar' },
        error: null
      };
      (axiosClientInstance.request as jest.Mock).mockResolvedValueOnce(expectedResult);

      const response = await createSendRequest(params)();

      expect(setLoadingOverlay).toHaveBeenCalledWith(true);
      expect(setLoadingOverlay).toHaveBeenLastCalledWith(false);
      expect(setResponse).toHaveBeenCalledWith(expectedResult);
      expect(response).toEqual(expectedResult);
    });

    it('should handle AxiosError and update state with error response', async () => {
      const payload = {};
      const message = 'Invalid Credentials';
      const statusCode = 400;
      const code = 'BAD_REQUEST';
      const error = { message, code, statusCode };
      const expectedResult = {
        loading: false,
        data: null,
        error
      };
      (axiosClientInstance.request as jest.Mock).mockImplementationOnce(() => {
        throw new AxiosError(message, `ERR_${code}`, undefined, undefined, {
          data: null,
          status: statusCode,
          statusText: 'Bad Request',
          headers,
          config: { headers } as any
        });
      });

      const response = await createSendRequest(params)(payload);

      expect(setLoadingOverlay).toHaveBeenCalledWith(true);
      expect(setLoadingOverlay).toHaveBeenLastCalledWith(false);
      expect(setResponse).toHaveBeenCalledWith(expectedResult);
      expect(response).toEqual(expectedResult);
    });
  });
});
