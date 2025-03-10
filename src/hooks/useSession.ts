import React from 'react';

import { OverlayStateOptions } from '@/composers/withOverlay/withOverlay.types';

const IDLE_TIMEOUT = 60 * 1000; // 60 seconds (1 minute)

type IdleProps = {
  setIdleOverlay: (value: boolean) => void;
  overlayState: OverlayStateOptions;
  timeout?: number;
};

export const useIdleTimeout = (props: IdleProps) => {
  const { setIdleOverlay, overlayState, timeout = IDLE_TIMEOUT } = props;
  const idleTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = React.useCallback(() => {
    // if (idleTimeout.current) {
    //   clearTimeout(idleTimeout.current);
    // }

    idleTimeout.current = setTimeout(() => {
      if (overlayState === 'IDLE') {
        setIdleOverlay(true);
      }
    }, timeout);

    setIdleOverlay(false);

  }, [setIdleOverlay, overlayState, timeout]);

  React.useEffect(() => {
    resetIdleTimer(); // Start timer initially

    return () => {
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
    };
  }, [resetIdleTimer]);
};
