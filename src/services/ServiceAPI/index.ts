import AuthService from '@/services/ServiceAPI/AuthService';
import ProductService from '@/services/ServiceAPI/ProductService';

import ServiceAPIConfig from './ServiceAPI.config';

const { apiOptions } = ServiceAPIConfig;

const ServiceAPI = {
  authService: new AuthService({ apiOptions }),
  productService: new ProductService({ apiOptions })
};

export default ServiceAPI;