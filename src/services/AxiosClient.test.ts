import MockAdapter from 'axios-mock-adapter';

import AxiosClient from './AxiosClient';

describe('AxiosClient', () => {
  const BASE_URL = 'https://api.example.com';
  let axiosClient: AxiosClient;
  let mock: MockAdapter;

  beforeEach(() => {
    axiosClient = new AxiosClient(BASE_URL);
    mock = new MockAdapter(axiosClient.getInstance());
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create an Axios instance with correct base URL', () => {
    expect(axiosClient.getInstance().defaults.baseURL).toBe(BASE_URL);
  });

  it('should add request interceptors', async () => {
    mock.onGet('/test').reply(200, { success: true });
    const response = await axiosClient.getInstance().get('/test');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it('should handle request errors properly', async () => {
    mock.onGet('/error').reply(500);
    await expect(axiosClient.getInstance().get('/error')).rejects.toThrow();
  });

  it('should include custom headers in requests', async () => {
    mock.onGet('/headers').reply(config => {
      return [200, config.headers];
    });

    const response = await axiosClient.getInstance().get('/headers');
    expect(response.data).toHaveProperty('X-Api-Key', 'secret');
    expect(response.data).toHaveProperty('X-Request-ID');
    expect(response.data).toHaveProperty('X-Session-ID');
  });
});
