import {
  OnHandleAlertDialogCallback,
  OnHandleIdleCountdownCallback,
  Props
} from './ExampleIdleOverlay.types';

const onHandleSetAlertDialogOptions = (
  props: Props
): OnHandleAlertDialogCallback => async (alertDialogOptions) => {
  const { setAlertDialog } = props;

  setAlertDialog(alertDialogOptions);
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
  onHandleSetAlertDialogOptions,
  onHandleIdleCountdown
};

export default handlers;