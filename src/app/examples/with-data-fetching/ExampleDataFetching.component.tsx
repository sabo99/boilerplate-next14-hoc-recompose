import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import AppBase from '@/components/AppComponents/AppBase';
import RefetchForm from '@/components/AppComponents/Forms/RefetchForm';
import Constants from '@/constants';
import { pathWithSearchParams, testProps, tid } from '@/lib/utils';

import ExampleDataFetchingConfig from './ExampleDataFetching.config';
import type { Props } from './ExampleDataFetching.types';

const { Paths } = Constants;

const {
  refetchSchema, refetchFormDefaultValue
} = ExampleDataFetchingConfig;

const ExampleDataFetching: React.FC<Props> = ({
  screenName, pageTitle, products, isLoadingProduct,
  onHandleRefetchProducts
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryLimit = searchParams.get('limit');

  const refetchForm = useForm<z.infer<typeof refetchSchema>>({
    resolver: zodResolver(refetchSchema),
    defaultValues: refetchFormDefaultValue
  });

  const onSubmitRefetch = async (payload: z.infer<typeof refetchSchema>) => {
    await onHandleRefetchProducts(payload, { form: refetchForm });
    router.push(pathWithSearchParams(Paths.Examples.WithDataFetching, payload));
  };

  React.useEffect(() => {
    async function fetchData() {
      if (queryLimit) {
        const payload = {
          limit: Number.parseInt(queryLimit)
        };
        await onHandleRefetchProducts(payload, { form: refetchForm });
      }
    }
    fetchData();
  }, [queryLimit, onHandleRefetchProducts, refetchForm]);

  const renderContent = () => (
    <div>
      <h1>Welcome to the data fetching page!</h1>

      <div className="my-3">
        <RefetchForm
          screenName={screenName}
          name="RefetchForm"
          form={refetchForm}
          onSubmit={onSubmitRefetch}
        />
      </div>

      <div className="my-4 p-4 bg-gray-100 rounded-lg shadow-md" {...testProps(tid(screenName, 'ProductContainer'))}>
        {isLoadingProduct
          ? <p className="text-gray-500" {...testProps(tid(screenName, 'LoadingProduct'))}>Loading products...</p>
          : (
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="border-b pb-2">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );

  return (
    <AppBase
      screenName={screenName}
      title={pageTitle}
      description="This is an example of data fetching using Axios."
    >
      <div {...testProps(tid(screenName, 'MainContainer'))}>
        {renderContent()}
      </div>
    </AppBase>
  );
};

export default ExampleDataFetching;