import { get } from 'lodash';

import withComposed from '@/composers/withComposed';
import type { DefaultPropsOptions, UiSettingOptions } from '@/composers/withComposed/withComposed.types';
import Constants from '@/constants';
import type { AxiosApiInstance, AxiosApiRequestSendArgs } from '@/types';

import ExampleDataFetching from './ExampleDataFetching.component';
import ExampleDataFetchingHandlers from './ExampleDataFetching.handlers';
import type { Props } from './ExampleDataFetching.types';

const { Permissions } = Constants;

export const defaultProps: DefaultPropsOptions = {
  screenName: 'ExampleDataFetching', // for unit testing
  pageTitle: 'Example with Data Fetching',
  permissions: Permissions
};

export const mapProductToProps = ({ request, response }: AxiosApiInstance) => {
  return {
    isLoadingProduct: response.loading,
    errorProduct: get(response, 'error', null),
    products: get(response.data, 'products', []),
    refetchProducts: (params?: AxiosApiRequestSendArgs) => request.send(params)
  };
};

export const mapAuthToProps = ({ request }: AxiosApiInstance) => ({
  login: (params: AxiosApiRequestSendArgs) => request.send(params)
});

export const uiSettings: UiSettingOptions = {
  sidebar: true
};

export default withComposed<Props>({
  props: defaultProps,
  api: [
    {
      url: '/products',
      method: 'GET',
      mapProps: mapProductToProps,
      options: {
        skipApiOnRender: true,
        headers: { 'Content-Type': 'application/json' },
        params: { limit: 10 }
      }
    },
    {
      url: '/auth/login',
      method: 'POST',
      mapProps: mapAuthToProps,
      options: {
        headers: { 'Content-Type': 'application/json' }
      }
    }
  ],
  handlers: ExampleDataFetchingHandlers,
  uiSettings
})(ExampleDataFetching);