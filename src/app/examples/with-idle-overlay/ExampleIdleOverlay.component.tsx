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
  setIdleOverlay,
  onHandleSetAppAlertDialogOptions, onHandleIdleCountdown
}) => {
  const timeout = Math.round(idleTimeout / delayInterval);
  const description = countdown === 0
    ? defaultValue.idleDescription
    : defaultValue.idleCountdownDescription(countdown);

  const onSetAlertDialogOptions = React.useCallback(() => {
    onHandleSetAppAlertDialogOptions({
      title: 'Custom Title',
      // message: '',
      onConfirm: () => setIdleOverlay(false),
      onCancel: () => setIdleOverlay(false)
    });
  }, [onHandleSetAppAlertDialogOptions, setIdleOverlay]);

  const onRunIdle = () => onHandleIdleCountdown({ timeout });

  React.useEffect(() => {
    onSetAlertDialogOptions();
  }, [onSetAlertDialogOptions]);

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