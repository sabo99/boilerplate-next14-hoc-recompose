import { useSubmitWithLoading } from '@/hooks';

import type { OnHandleCallback, Props } from './ExampleLoadingOverlay.types';

const doHandle = (props: Props): OnHandleCallback => async (
  values, callbacks
) => {
  const { } = props;
  const { delay = 3 } = values;
  const { onBefore, onAfter } = callbacks;

  onBefore();

  // Simulate data fetching process
  await new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, delay * 1000);
  });

  onAfter();
};

const onHandleSubmit = (props: Props): OnHandleCallback => async (
  values, callbacks
) => {
  await useSubmitWithLoading(
    props, async () => doHandle(props)(values, callbacks),
  );
};

const handlers = {
  onHandleSubmit
};

export default handlers;