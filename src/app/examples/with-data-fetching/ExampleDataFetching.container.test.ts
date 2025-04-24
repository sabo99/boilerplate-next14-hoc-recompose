import Constants from '@/constants';
import { products } from '@/fixtures';

import {
  defaultProps,
  mapAuthToProps,
  mapProductToProps,
  uiSettings
} from './ExampleDataFetching.container';

const { Permissions } = Constants;

describe('ExampleDataFetchingContainer', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#defaultProps', () => {
    it('should return the correct defaultProps', () => {
      const expected = {
        screenName: 'ExampleDataFetching',
        pageTitle: 'Example with Data Fetching',
        permissions: Permissions
      };

      expect(defaultProps).toEqual(expected);
    });

    it('should return the incorrect defaultProps', () => {
      const expected = {
        screenName: 'ExampleDataFetching'
      };

      expect(defaultProps).not.toEqual(expected);
    });
  });

  describe('#api', () => {
    const axiosApiInstance = {
      request: {
        send: jest.fn()
      },
      response: {
        loading: false,
        error: null,
        data: { products }
      }
    };

    describe('#mapProductToProps', () => {
      it('should return the correct mapProductToProps', () => {
        const expectedResult = {
          isLoadingProduct: false,
          errorProduct: null,
          products,
          refetchProducts: expect.any(Function)
        };
        const params = { apiOptions: { params: { limit: 10 } } };

        const result = mapProductToProps(axiosApiInstance);
        result.refetchProducts(params);

        expect(result).toEqual(expectedResult);
        expect(axiosApiInstance.request.send).toHaveBeenCalled();
      });

      it('should return the incorrect mapProductToProps', () => {
        const expectedResult = {
          onlyFunc: false
        };

        const result = mapProductToProps(axiosApiInstance);

        expect(result).not.toEqual(expectedResult);
      });
    });

    describe('#mapAuthToProps', () => {
      it('should return the correct mapAuthToProps', () => {
        const expectedResult = {
          login: expect.any(Function)
        };
        const params = { payload: {} };

        const result = mapAuthToProps(axiosApiInstance);
        result.login(params);

        expect(result).toEqual(expectedResult);
        expect(axiosApiInstance.request.send).toHaveBeenCalledWith(params);
      });

      it('should return the incorrect mapAuthToProps', () => {
        const expectedResult = {
          anotherFunc: expect.any(Function)
        };

        const result = mapAuthToProps(axiosApiInstance);

        expect(result).not.toEqual(expectedResult);
      });
    });
  });

  describe('#uiSettings', () => {
    it('should be return the correct uiSettings', () => {
      const expectedResult = {
        sidebar: true
      };

      expect(uiSettings).toEqual(expectedResult);
    });

    it('should be return the incorrect uiSettings', () => {
      const expectedResult = {
        sidebar: false
      };

      expect(uiSettings).not.toEqual(expectedResult);
    });
  });

});