import { compose } from 'react-recompose';

import ServiceAPI from '@/services/ServiceAPI';
import type { AxiosApiInstance, AxiosApiRequestArgs } from '@/types';

import withComposed from '../withComposed';
import withStepUpComposer from './withStepUp.composer';
import withStepUpHandlers from './withStepUp.handlers';

export const mapStepUpPasswordToProps = ({ request }: AxiosApiInstance) => ({
  verifyStepUpPassword: (args: AxiosApiRequestArgs) => request.send(args)
});

const composed = () => withComposed({
  api: {
    loadingOverlay: true,
    apiRequests: [
      {
        ...ServiceAPI.authService.loginByUsernamePassword(),
        mapProps: mapStepUpPasswordToProps
      }
    ]
  },
  handlers: withStepUpHandlers
});

const Container = () => compose(
  composed(),
  withStepUpComposer()
);

export default Container;