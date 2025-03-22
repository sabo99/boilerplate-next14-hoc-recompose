import React from 'react';
import { compose } from 'react-recompose';

import AppAlertDialog from '@/components/AppComponents/AppAlertDialog';
import Overlay from '@/components/AppComponents/Overlay';
import { useIdleTimeout } from '@/hooks';

import Config from './withIdlePopupOverlay.config';
import { Props } from './withIdlePopupOverlay.types';

const { withConnectorIdlePopupOverlay, withStateIdlePopupOverlay } = Config;

const ComposedIdlePopupOverlay = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const {
      screenName,
      isIdleOverlay,
      setIdleOverlay,
      appAlertDialogOptions,
      idleTimeout: timeout = 5000
    } = props;
    const callbacks = {
      setIdleOverlay
    };
    const isOpen = isIdleOverlay;
    useIdleTimeout({ timeout, ...callbacks });

    const renderContent = () => (
      <AppAlertDialog
        screenName={screenName}
        {...appAlertDialogOptions}
      />
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

const withIdlePopupOverlay = () => compose(
  ...withStateIdlePopupOverlay,
  withConnectorIdlePopupOverlay,
  ComposedIdlePopupOverlay
);

export default withIdlePopupOverlay;