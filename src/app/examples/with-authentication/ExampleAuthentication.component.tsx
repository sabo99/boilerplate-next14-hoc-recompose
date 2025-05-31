import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import AppBase from '@/components/AppComponents/AppBase';
import LoginForm from '@/components/AppComponents/Forms/LoginForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import ExampleAuthenticationConfig from './ExampleAuthentication.config';
import type { Props } from './ExampleAuthentication.types';

const {
  loginSchema, loginFormDefaultValue
} = ExampleAuthenticationConfig;

const ExampleAuthentication: React.FC<Props> = (props) => {
  const {
    screenName, pageTitle, session,
    onHandleLogin, onHandleLogout
  } = props;
  const { isAuthenticated = null } = session;

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValue
  });

  const onSubmitLogin = async (payload: z.infer<typeof loginSchema>) => {
    await onHandleLogin(payload, { form: loginForm });
  };

  const onLogout = async () => {
    await onHandleLogout({ form: loginForm });
  };

  const renderAuthenticatedContent = () => (
    <>
      <h1>Welcome to the authenticated page!</h1>
      <p>You are logged in.</p>

      <Button
        {...testProps(tid(screenName, 'LogoutButton'))}
        variant="destructive"
        onClick={onLogout}
      >
        Logout
      </Button>
    </>
  );

  const renderUnauthenticatedContent = () => (
    <>
      <h1 className="mb-4">Please log in to access the page.</h1>
      <LoginForm
        screenName={screenName}
        name="LoginForm"
        form={loginForm}
        onSubmit={onSubmitLogin}
      />
    </>
  );

  const renderContent = isAuthenticated
    ? renderAuthenticatedContent
    : renderUnauthenticatedContent;

  return (
    <AppBase
      screenName={screenName}
      title={pageTitle}
      description="This is an example of data fetching using Axios."
    >
      isAuthenticated: {isAuthenticated ? 'true' : 'false'}
      <div {...testProps(tid(screenName, 'MainContainer'))}>
        {renderContent()}
      </div>
    </AppBase>
  );
};

export default ExampleAuthentication;