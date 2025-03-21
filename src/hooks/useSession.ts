import React from 'react';

const IDLE_TIMEOUT = 60 * 1000; // 60 seconds (1 minute)

type IdleProps = {
  setIdleOverlay: (value: boolean) => void;
  timeout?: number;
};

export const useIdleTimeout = (props: IdleProps) => {
  const { setIdleOverlay, timeout = IDLE_TIMEOUT } = props;
  const idleTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const idleTimer = React.useCallback(() => {
    setIdleOverlay(false);

    idleTimeout.current = setTimeout(() => {
      setIdleOverlay(true);
    }, timeout);
  }, [setIdleOverlay, timeout]);

  React.useEffect(() => {
    idleTimer(); // Start timer initially

    return () => {
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
    };
  }, [idleTimer]);
};
