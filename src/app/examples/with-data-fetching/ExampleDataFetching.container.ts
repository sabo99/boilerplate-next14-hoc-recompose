import { get } from 'lodash';

import withComposed from '@/composers/withComposed';
import Constants from '@/constants';
import ServiceAPI from '@/services/ServiceAPI';
import type {
  AxiosApiInstance,
  AxiosApiRequestArgs,
  ComposedDefaultPropsOptions,
  ComposedUiSettingOptions
} from '@/types';

import ExampleDataFetching from './ExampleDataFetching.component';
import ExampleDataFetchingHandlers from './ExampleDataFetching.handlers';
import type { Props } from './ExampleDataFetching.types';

const { Permissions } = Constants;

export const defaultProps: ComposedDefaultPropsOptions = {
  screenName: 'ExampleDataFetching', // for unit testing
  pageTitle: 'Example with Data Fetching',
  permissions: Permissions
};

export const mapProductToProps = ({ request, response }: AxiosApiInstance) => {
  return {
    isLoadingProduct: response.loading,
    errorProduct: get(response, 'error', null),
    products: get(response.data, 'products', []),
    refetchProducts: (args?: AxiosApiRequestArgs) => request.send(args)
  };
};

export const mapAuthToProps = ({ request }: AxiosApiInstance) => ({
  login: (args: AxiosApiRequestArgs) => request.send(args)
});

export const uiSettings: ComposedUiSettingOptions = {
  sidebar: true
};

export default withComposed<Props>({
  props: defaultProps,
  api: {
    loadingOverlay: true,
    apiRequests: [
      {
        ...ServiceAPI.productService.fetchProducts(),
        mapProps: mapProductToProps,
        options: {
          skipApiOnRender: true,
          headers: { 'Content-Type': 'application/json' },
          params: { limit: 10 }
        }
      }
    ]
  },
  handlers: ExampleDataFetchingHandlers,
  uiSettings
})(ExampleDataFetching);