import React from 'react';
import { compose, withState } from 'react-recompose';

import AppIdleSession from '@/components/AppComponents/AppIdleSession';
import type { StateOptions } from '@/composers/withComposed/withComposed.types';

import WithIdlePopupOverlayConfig from './withIdlePopupOverlay.config';
import type { Props } from './withIdlePopupOverlay.types';

const { defaultProps } = WithIdlePopupOverlayConfig;

const ComposedIdlePopupOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {

    return (
      <>
        <AppIdleSession {...props} />
        <ComposedComponent {...props} />
      </>
    );
  };

  return HOC;
};

const stateOptions: StateOptions = [
  ['isIdlePopupOverlay', 'setIdlePopupOverlay', false],
  ['idleTimeout', 'setIdleTimeout', defaultProps.idleTimeout],
  ['popupTimeout', 'setPopupTimeout', defaultProps.popupTimeout]
];
const withStateOptions = stateOptions.map(
  (stateOption) => withState(...(stateOption))
);

const withIdlePopupOverlay = () => compose(
  ...withStateOptions,
  ComposedIdlePopupOverlay
);

export default withIdlePopupOverlay;