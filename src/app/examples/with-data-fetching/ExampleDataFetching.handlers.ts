import { useSubmitWithLoading } from '@/hooks';

import type {
  OnHandleRefetchProductCallback,
  Props
} from './ExampleDataFetching.types';

const doHandleRefrechProducts = (props: Props): OnHandleRefetchProductCallback => async (payload, options) => {
  const { refetchProducts, searchParams } = props;

  if (payload && options) {
    await refetchProducts({
      apiOptions: { params: payload }
    });
    options.form.reset();
    return;
  }

  if (searchParams) {
    await refetchProducts({
      apiOptions: { params: searchParams }
    });
    return;
  }

  await refetchProducts();
};

const onHandleRefetchProducts = (props: Props): OnHandleRefetchProductCallback => async (payload, options) => {
  await useSubmitWithLoading(props, async () => doHandleRefrechProducts(props)(payload, options));
};

const handlers = {
  onHandleRefetchProducts
};

export default handlers;