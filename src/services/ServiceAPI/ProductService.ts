import { throwIfMissing } from '@sabo99/node-utils';

import type { ApiCallOptions, AxiosApiOptions, ProductServiceOptions } from '@/types';

/**
 * Provides product-related API endpoints.
 *
 * @remarks
 * This class encapsulates methods for product requests.
 */
class ProductService {
  private readonly apiOptions!: AxiosApiOptions;

  constructor(readonly options: ProductServiceOptions) {
    throwIfMissing(options, 'options required');
    throwIfMissing(options.apiOptions, 'options.apiOptions required');

    Object.assign(this, options);
  }

  fetchProducts(): ApiCallOptions {
    return {
      url: '/products',
      method: 'GET',
      options: this.apiOptions
    };
  }
}

export default ProductService;