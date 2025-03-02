import { useSubmitWithLoading } from '@/hooks';

import type { OnHandleCallback, Props } from './ExampleLoadingOverlay.types';

/* eslint-disable no-console */
const doHandle = (props: Props): OnHandleCallback => async (
  values, callbacks
) => {
  const { } = props;
  const { message, delay = 3 } = values;
  const { onBefore, onAfter } = callbacks;

  alert(message);
  onBefore();
  console.log('Simulate data fetching process in:', `${delay} seconds`);

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
  console.clear();
  await useSubmitWithLoading(
    props, async () => doHandle(props)(values, callbacks),
  );
};

const handlers = {
  onHandleSubmit
};

export default handlers;