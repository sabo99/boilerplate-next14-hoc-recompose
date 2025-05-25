import { compose } from 'react-recompose';

import LoadingOverlay from '@/components/AppComponents/LoadingOverlay';

import withLoadingOverlayConfig from './withLoadingOverlay.config';
import type { Props } from './withLoadingOverlay.types';

const { withLoadingOverlayState } = withLoadingOverlayConfig;

const ComposedLoadingOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    return (
      <>
        <ComposedComponent {...props} />
        <LoadingOverlay {...props} />
      </>
    );
  };

  return HOC;
};

const withLoadingOverlay = () => compose(
  withLoadingOverlayState(),
  ComposedLoadingOverlay
);

export default withLoadingOverlay;