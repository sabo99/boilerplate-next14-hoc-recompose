import React from 'react';

import type { AppDialogButton } from '@/components/AppComponents/AppDialog/AppDialog.types';
import AppForm from '@/components/AppComponents/AppForm';
import InputForm from '@/components/AppComponents/AppForm/InputForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import type { Props } from './StepUpPasswordForm.types';

const StepUpPasswordForm: React.FC<Props> = (props) => {
  const {
    screenName,
    name,
    form,
    appDialogOption
  } = props;
  const id = tid(screenName, name);
  const buttons = appDialogOption?.buttons;

  const renderButton = (button: AppDialogButton, index: number) => {
    const { label, ...buttonOption } = button;
    return (
      <Button
        key={index}
        {...buttonOption}
        {...testProps(tid(id, label, 'ActionButton'))}
      >
        {label}
      </Button>
    );
  };

  return (
    <AppForm
      {...props}
      form={form}
      name={name}
    >
      <InputForm
        control={form.control as any}
        screenName={screenName}
        autoFocus={false}
        type="password"
        name="password"
        label="Password"
        description="Currently active as `emilys` | password: `emilyspass`"
        placeholder="Input your password"
        {...testProps(tid(id, 'InputForm', 'Password'))}
      />

      <div className="flex justify-end gap-3">
        {buttons && buttons.map(renderButton)}
      </div>

    </AppForm>
  );
};

export default StepUpPasswordForm;