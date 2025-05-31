import { render, waitFor } from '@testing-library/react';
import React from 'react';

import Providers from '@/app/providers';
import withAxiosApi from '@/composers/withAxiosApi';
import AxiosClient from '@/services/AxiosClient';
import { AxiosApiInstance } from '@/types';

jest.mock('@/services/AxiosClient');

describe('withAxiosApi HOC', () => {
  let EnhancedComponent: React.ComponentType<any>;
  const screenName = 'TestScreen';
  const props = {
    screenName,
    setResponse: jest.fn(),
    refetch: jest.fn()
  };

  const options: any = {
    url: '/test',
    method: 'GET',
    mapProps: jest.fn(({ response }: AxiosApiInstance) => ({
      loading: response.loading,
      data: response.data,
      error: response.error
    }))
  };

  const MockComponent = ({ loading, data, error, refetch }: any) => (
    <div>
      {loading && <p>Loading...</p>}
      {data && <p>Data: {data.message}</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={refetch} data-testid="refetchButton">Refetch Data</button>
    </div>
  );

  const mockAxiosRequest = (response: any, isError = false) => {
    (AxiosClient as jest.Mock).mockImplementation(() => ({
      getInstance: () => ({
        request: jest.fn(() =>
          isError ? Promise.reject(response) : Promise.resolve({ data: response })
        )
      })
    }));
  };

  beforeEach(() => {
    EnhancedComponent = withAxiosApi(options)(MockComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders loading state and updates with API response', async () => {
    const message = 'Success';
    mockAxiosRequest({ message });

    const { getByText } = render(
      <Providers>
        <EnhancedComponent {...props} />
      </Providers>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText(`Data: ${message}`)).toBeInTheDocument();
    });
  });

  it('should display error state when API request fails', async () => {
    const errorMessage = 'API Error';
    const statusCode = 500;
    const errorAxios: any = {
      message: errorMessage,
      response: { data: { message: errorMessage, status: statusCode } },
      status: statusCode,
      code: 'ERR_INTERNAL_SERVER_ERROR'
    };
    mockAxiosRequest(new Error(errorAxios), true);

    const { getByText } = render(
      <Providers>
        <EnhancedComponent {...props} />
      </Providers>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText(`Error: ${errorAxios}`)).toBeInTheDocument();
    });
  });

  it('should skips API call when `skipApiOnRender` is true or method is not `GET`', async () => {
    const mockOptions = {
      ...options,
      method: 'POST',
      options: { skipApiOnRender: true }
    };
    mockAxiosRequest({ message: 'Success' });

    EnhancedComponent = withAxiosApi(mockOptions)(MockComponent);
    const { queryByText } = render(
      <Providers>
        <EnhancedComponent {...props} />
      </Providers>
    );

    expect(queryByText('Data: Success')).not.toBeInTheDocument();
  });
});
