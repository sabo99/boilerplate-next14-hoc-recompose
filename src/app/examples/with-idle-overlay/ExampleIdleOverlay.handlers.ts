import {
  OnHandleAppAlertDialogCallback,
  OnHandleIdleCountdownCallback,
  Props
} from './ExampleIdleOverlay.types';

const onHandleSetAppAlertDialogOptions = (
  props: Props
): OnHandleAppAlertDialogCallback => async (alertDialogOptions) => {
  const { setAppAlertDialogOptions } = props;

  setAppAlertDialogOptions(alertDialogOptions);
};

const onHandleIdleCountdown = (
  props: Props
): OnHandleIdleCountdownCallback => async (params) => {
  const { setCountdown, setIdleOverlay } = props;
  const { timeout } = params;

  setCountdown(timeout);
  setTimeout(() => setIdleOverlay(true), timeout * 1000);
};

const handlers = {
  onHandleSetAppAlertDialogOptions,
  onHandleIdleCountdown
};

export default handlers;