import { compose, withState } from 'react-recompose';

import LoadingOverlay from '@/components/AppComponents/LoadingOverlay';

import type { Props } from './withLoadingOverlay.types';

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
  withState('isLoadingOverlay', 'setLoadingOverlay', false),
  ComposedLoadingOverlay
);

export default withLoadingOverlay;