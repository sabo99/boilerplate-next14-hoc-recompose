import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import AppBase from '@/components/AppComponents/AppBase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { testProps, tid } from '@/lib/utils';

import ExampleDataFetchingConfig from './ExampleDataFetching.config';
import type { Props } from './ExampleDataFetching.types';

const { formSchema, formDefaultValue } = ExampleDataFetchingConfig;

const ExampleDataFetching: React.FC<Props> = ({
  screenName, products, isLoadingProduct, session,
  onHandleLogin, onHandleRefetchProducts, onHandleLogout
}) => {
  const { isAuthenticated = null } = session!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      onHandleRefetchProducts();
    }
  }, [isAuthenticated, onHandleRefetchProducts]);

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    await onHandleLogin(payload, { form });
    await onHandleRefetchProducts();
  };

  const onLogout = async () => {
    await onHandleLogout({ form });
  };

  const renderForm = () => (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel {...testProps(tid(screenName, 'FormLabel', field.name))}>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  {...testProps(tid(screenName, 'Input', field.name))}
                  {...field}
                  placeholder="Input your username" />
              </FormControl>
              <FormDescription {...testProps(tid(screenName, 'FormDescription', field.name))}>
                Choose a username that is unique and easy to remember. Example: `emilys`
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel {...testProps(tid(screenName, 'FormLabel', field.name))}>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  {...testProps(tid(screenName, 'Input', field.name))}
                  {...field}
                  type='password'
                  placeholder="Input your password" />
              </FormControl>
              <FormDescription {...testProps(tid(screenName, 'FormDescription', field.name))}>
                Enter a secure password. Example: `emilyspass`
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          {...testProps(tid(screenName, 'LoginButton'))}
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );

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
      {renderForm()}
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