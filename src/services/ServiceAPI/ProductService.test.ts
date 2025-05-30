import { ProductServiceOptions } from '@/types';

import ProductService from './ProductService';

describe('ProductService', () => {
  const apiOptions = {
    headers: { 'Content-Type': 'application/json' },
    skipApiOnRender: true
  };
  const mockArgs: ProductServiceOptions = {
    apiOptions
  };
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService(mockArgs);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#fetchProducts', () => {
    it('should return api call options result', () => {
      const expectedResult = {
        url: '/products',
        method: 'GET',
        options: apiOptions
      };

      const result = service.fetchProducts();

      expect(result).toEqual(expectedResult);
    });
  });

});