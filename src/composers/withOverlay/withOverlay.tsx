/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { compose, withProps } from 'react-recompose';

import Overlay from '@/components/AppComponents/Overlay';
import {
  withConnectorOverlay,
  withStateOverlay
} from '@/composers/withOverlay/withOverlay.config';

import type { Options, Props } from './withOverlay.types';

const ComposedOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      screenName,
      isLoadingOverlay,
      isIdleOverlay,
      overlayState,
      loaderType = 'DOTS'
    } = props;
    const isOpen = isLoadingOverlay || isIdleOverlay;

    return (
      <>
        <ComposedComponent {...props} />
        {isOpen &&
          <Overlay
            screenName={screenName}
            overlayState={overlayState}
            loaderType={loaderType} />
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