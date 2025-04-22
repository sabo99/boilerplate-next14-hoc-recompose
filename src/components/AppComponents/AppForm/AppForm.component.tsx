import React from 'react';

import { Form } from '@/components/ui/form';
import { testProps, tid } from '@/lib/utils';

import type { Props } from './AppForm.types';

const AppForm: React.FC<Props> = ({
  screenName, name, form, children, onSubmit
}) => {
  const testId = tid(screenName, name);

  return (
    <Form {...form}>
      <form className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        {...testProps(testId)}
      >
        {children}
      </form>
    </Form>
  );
};

export default AppForm;