import React from 'react';
import { compose, withState } from 'react-recompose';

import AppAlertDialog from '@/components/AppComponents/AppAlertDialog';
import Overlay from '@/components/AppComponents/Overlay';
import { useIdleTimeout } from '@/hooks';

import type { StateOptions } from '../withPage/withPage.types';
import type { Props } from './withIdlePopupOverlay.types';

const ComposedIdlePopupOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      screenName,
      isIdleOverlay,
      setIdleOverlay,
      idleTimeout: timeout = 5000
    } = props;
    const callbacks = {
      setIdleOverlay
    };
    const isOpen = isIdleOverlay;
    useIdleTimeout({ timeout, ...callbacks });

    const renderContent = () => (
      <AppAlertDialog {...props} />
    );

    return (
      <>
        <ComposedComponent {...props} />
        {isOpen &&
          <Overlay
            screenName={screenName}
            content={renderContent()}
            withoutOpacity
          />
        }
      </>

    );
  };

  return HOC;
};

const stateOptions: StateOptions = [
  ['isIdleOverlay', 'setIdleOverlay', false],
  ['appAlertDialogOptions', 'setAppAlertDialogOptions', {}]
];
const withStateOptions = stateOptions.map(
  (stateOption) => withState(...(stateOption))
);

const withIdlePopupOverlay = () => compose(
  ...withStateOptions,
  ComposedIdlePopupOverlay
);

export default withIdlePopupOverlay;