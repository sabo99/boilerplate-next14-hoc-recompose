import React from 'react';
import { compose, withProps } from 'react-recompose';

import Overlay from '@/components/AppComponents/Overlay';
import {
  withConnectorOverlay,
  withStateOverlay
} from '@/composers/withOverlay/withOverlay.config';
import { useIdleTimeout } from '@/hooks';

import type { Options, Props } from './withOverlay.types';

const ComposedOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      screenName,
      isLoadingOverlay,
      isIdleOverlay,
      setIdleOverlay,
      overlayState,
      alertDialog,
      loaderType = 'DOTS',
      idleTimeout = 5000
    } = props;
    const isOpen = isLoadingOverlay || isIdleOverlay;
    const callbacks = {
      setIdleOverlay
    };

    useIdleTimeout({ overlayState, timeout: idleTimeout, ...callbacks });

    return (
      <>
        <ComposedComponent {...props} />
        {isOpen &&
          <Overlay
            screenName={screenName}
            overlayState={overlayState}
            loaderType={loaderType}
            callbacks={callbacks}
            alertDialog={alertDialog}
          />
        }
      </>
    );
  };

  return HOC;
};

const StateOverlay = withConnectorOverlay; // using connector (react-redux)
const ArrayStateOverlay = withStateOverlay; // using withState (react-recompose)

const withOverlay = (options: Options) => compose(
  withProps(options),
  StateOverlay,
  ...ArrayStateOverlay,
  ComposedOverlay
);

export default withOverlay;