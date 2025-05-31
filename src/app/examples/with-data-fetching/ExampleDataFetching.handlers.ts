import type {
  OnHandleRefetchProductCallback,
  Props
} from './ExampleDataFetching.types';

const onHandleRefetchProducts = (props: Props): OnHandleRefetchProductCallback => async (payload, options) => {
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

const handlers = {
  onHandleRefetchProducts
};

export default handlers;