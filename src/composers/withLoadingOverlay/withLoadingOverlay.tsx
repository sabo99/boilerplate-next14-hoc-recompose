import React from 'react';
import { compose, withProps } from 'react-recompose';

import LoadingOverlay from '@/components/AppComponents/LoadingOverlay';
import {
  withConnectorLoadingOverlay
  // withStateLoadingOverlay
} from '@/composers/withLoadingOverlay/withLoadingOverlay.config';

import type { Options, Props } from './withLoadingOverlay.types';

const ComposedLoadingOverlay = (ComposedComponent: React.ComponentType<any>) => {
  const HOC = (props: Props) => {
    const { isLoadingOverlay = false, loadingVariant = 'DOTS' } = props;
    return (
      <div>
        <ComposedComponent {...props} />
        {isLoadingOverlay && <LoadingOverlay variant={loadingVariant} />}
      </div>
    );
  };

  return HOC;
};

const StateLoadingOverlay = () => withConnectorLoadingOverlay; // using connector (react-redux)
// const StateLoadingOverlay = () => withStateLoadingOverlay; // using withState (react-recompose)

const withLoadingOverlay = (options: Options) => compose(
  withProps(options),
  StateLoadingOverlay(),
  ComposedLoadingOverlay
);

export default withLoadingOverlay;