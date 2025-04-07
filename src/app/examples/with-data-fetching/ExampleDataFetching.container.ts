import { get } from 'lodash';

import { AxiosApiInstance } from '@/composers/withAxiosApi/withAxiosApi.types';
import withPage from '@/composers/withPage';
import type { DefaultPropsOptions, UiSettingOptions } from '@/composers/withPage/withPage.types';
import Constants from '@/constants';

import ExampleDataFetching from './ExampleDataFetching.component';
import ExampleDataFetchingHandlers from './ExampleDataFetching.handlers';

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
    refetchProducts: request.send
  };
};

export const mapAuthToProps = ({ request }: AxiosApiInstance) => ({
  login: (payload: object) => request.send(payload)
});

export const uiSettings: UiSettingOptions = {
  sidebar: true
};

export default withPage({
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