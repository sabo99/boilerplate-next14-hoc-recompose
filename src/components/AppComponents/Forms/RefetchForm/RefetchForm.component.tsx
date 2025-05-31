import React from 'react';

import AppForm from '@/components/AppComponents/AppForm';
import InputForm from '@/components/AppComponents/AppForm/InputForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import type { Props } from './RefetchForm.types';

const RefetchForm: React.FC<Props> = (props) => {
  const { screenName, name, form } = props;
  const id = tid(screenName, name);

  return (
    <AppForm
      {...props}
      {...testProps(tid(id))}
    >
      <InputForm
        control={form.control}
        screenName={screenName}
        name="limit"
        label="Limit"
        description="By default limit 10, you can adjust what you want."
        placeholder="Input limit refetch data"
        type="number"
        {...testProps(tid(id, 'InputForm', 'Limit'))}
      />

      <Button
        type="submit"
        {...testProps(tid(id, 'RefetchButton'))}
      >
        Refetch Data
      </Button>
    </AppForm>
  );
};

export default RefetchForm;