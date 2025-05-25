import React from 'react';

import AppForm from '@/components/AppComponents/AppForm';
import InputForm from '@/components/AppComponents/AppForm/InputForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import type { Props } from './LoginForm.types';

const LoginForm: React.FC<Props> = (props) => {
  const { screenName, name, form } = props;
  const id = tid(screenName, name);

  return (
    <AppForm
      {...props}>
      <InputForm
        {...testProps(tid(id, 'InputForm', 'Username'))}
        control={form.control}
        screenName={screenName}
        name="username"
        label="Username"
        description="Choose a username that is unique and easy to remember. Example: `emilys`"
        placeholder="Input your username"
      />

      <InputForm
        control={form.control}
        screenName={screenName}
        name="password"
        label="Password"
        description="Enter a secure password. Example: `emilyspass`"
        placeholder="Input your password"
        type="password"
      />

      <Button
        {...testProps(tid(id, 'LoginButton'))}
        type="submit"
      >
        Login
      </Button>
    </AppForm>
  );
};

export default LoginForm;