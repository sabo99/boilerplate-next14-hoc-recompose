import React from 'react';

import AppForm from '@/components/AppComponents/AppForm';
import InputForm from '@/components/AppComponents/AppForm/InputForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';
import type { AppDialogButtonOptions } from '@/types';

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

  const renderButton = (button: AppDialogButtonOptions, index: number) => {
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
      {...testProps(tid(id, 'AppForm'))}
    >
      <InputForm
        control={form.control}
        screenName={screenName}
        autoFocus={false}
        type="password"
        name="password"
        label="Password"
        description="Currently active as `emilys` | password: `emilyspass`"
        placeholder="Input your password"
        {...testProps(tid(id, 'InputForm', 'Password'))}
      />

      {buttons && (
        <div className="flex justify-end gap-3">
          {buttons.map(renderButton)}
        </div>
      )}
    </AppForm>
  );
};

export default StepUpPasswordForm;