import withComposed from '@/composers/withComposed';
import Constants from '@/constants';
import ServiceAPI from '@/services/ServiceAPI';
import type {
  AxiosApiInstance,
  AxiosApiRequestArgs,
  ComposedDefaultPropsOptions,
  ComposedUiSettingOptions
} from '@/types';

import ExampleAuthentication from './ExampleAuthentication.component';
import ExampleAuthenticationHandlers from './ExampleAuthentication.handlers';
import type { Props } from './ExampleAuthentication.types';

const { Permissions } = Constants;

export const defaultProps: ComposedDefaultPropsOptions = {
  screenName: 'ExampleAuthentication', // for unit testing
  pageTitle: 'Example with Authentication',
  permissions: Permissions
};

export const mapAuthToProps = ({ request }: AxiosApiInstance) => ({
  login: (args: AxiosApiRequestArgs) => request.send(args)
});

export const uiSettings: ComposedUiSettingOptions = {
  sidebar: true
};

export default withComposed<Props>({
  withAuthEnabled: true,
  props: defaultProps,
  api: {
    loadingOverlay: true,
    apiRequests: [
      {
        ...ServiceAPI.authService.loginByUsernamePassword(),
        mapProps: mapAuthToProps
      }
    ]
  },
  handlers: ExampleAuthenticationHandlers,
  uiSettings
})(ExampleAuthentication);