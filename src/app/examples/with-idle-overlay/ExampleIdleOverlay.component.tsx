import React from 'react';

import AppBase from '@/components/AppComponents/AppBase';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import ExampleIdleOverlayConfig from './ExampleIdleOverlay.config';
import type { Props } from './ExampleIdleOverlay.types';

const { delayInterval, defaultValue } = ExampleIdleOverlayConfig;

const ExampleIdleOverlay: React.FC<Props> = ({
  screenName, idleTimeout,
  countdown, setCountdown,
  onHandleSetAppAlertDialogOptions, onHandleIdleCountdown
}) => {
  const timeout = Math.round(idleTimeout / delayInterval);
  const description = countdown === 0
    ? defaultValue.idleDescription
    : defaultValue.idleCountdownDescription(countdown);

  const onRunIdle = () => {
    onHandleIdleCountdown({ timeout });
    onHandleSetAppAlertDialogOptions({
      title: 'Idle Timeout Alert',
      message: 'The idle countdown has been reset. Click "Run Idle Again" to start a new countdown.'
    });
  };

  React.useEffect(() => {
    if (countdown === 0) return; // Stop interval when countdown reaches 0

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, delayInterval);

    return () => clearInterval(interval);

  }, [countdown, setCountdown, timeout]);

  return (
    <AppBase
      screenName={screenName}
      title="Example withIdleOverlayPage"
      description={description}
    >
      <div>
        <Button
          {...testProps(tid(screenName, 'IdleCountdownButton'))}
          disabled={countdown > 0}
          onClick={onRunIdle}>
          Run Idle Again
        </Button>
      </div>
    </AppBase>

  );
};

export default ExampleIdleOverlay;