import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import AppBase from '@/components/AppComponents/AppBase';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import LoginForm from './(Forms)/LoginForm';
import ExampleDataFetchingConfig from './ExampleDataFetching.config';
import type { Props } from './ExampleDataFetching.types';

const { loginSchema, loginFormDefaultValue } = ExampleDataFetchingConfig;

const ExampleDataFetching: React.FC<Props> = ({
  screenName, products, isLoadingProduct, session,
  onHandleLogin, onHandleRefetchProducts, onHandleLogout
}) => {
  const { isAuthenticated = null } = session!;

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValue
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      onHandleRefetchProducts();
    }
  }, [isAuthenticated, onHandleRefetchProducts]);

  const onSubmit = async (payload: z.infer<typeof loginSchema>) => {
    await onHandleLogin(payload, { form: loginForm });
    await onHandleRefetchProducts();
  };

  const onLogout = async () => {
    await onHandleLogout({ form: loginForm });
  };

  const authenticatedRender = () => (
    <div>
      <h1>Welcome to the authenticated page!</h1>
      <p>You are logged in.</p>

      <Button
        {...testProps(tid(screenName, 'LogoutButton'))}
        variant="destructive"
        onClick={onLogout}
      >
        Logout
      </Button>

      <div className="my-4 p-4 bg-gray-100 rounded-lg shadow-md" {...testProps(tid(screenName, 'ProductContainer'))}>
        {isLoadingProduct ? <p className="text-gray-500">Loading products...</p> : (
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

  const unauthenticatedRender = () => (
    <div>
      <h1 className="mb-4">Please log in to access the page.</h1>

      <LoginForm
        screenName={screenName}
        name="LoginForm"
        form={loginForm}
        onSubmit={onSubmit}
      />
    </div>
  );

  const content = isAuthenticated
    ? authenticatedRender()
    : unauthenticatedRender();

  return (
    <AppBase
      screenName={screenName}
      title="Example withDataFetching"
      description="This is an example of data fetching using Axios."
    >
      isAuthenticated: {isAuthenticated ? 'true' : 'false'}
      <div {...testProps(tid(screenName, 'MainContainer'))}>
        {content}
      </div>
    </AppBase>
  );
};

export default ExampleDataFetching;