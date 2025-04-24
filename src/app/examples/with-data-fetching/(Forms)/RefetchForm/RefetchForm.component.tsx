import React from 'react';

import AppForm from '@/components/AppComponents/AppForm';
import InputForm from '@/components/AppComponents/AppForm/InputForm';
import { Button } from '@/components/ui/button';
import { testProps, tid } from '@/lib/utils';

import type { Props } from '../Form.types';

const RefetchForm: React.FC<Props> = (props) => {
    const { screenName, name, form } = props;
    const id = tid(screenName, name);

  return (
    <AppForm
      {...props}>
      <InputForm
        {...testProps(tid(id, 'InputForm', 'Limit'))}
        control={form.control}
        screenName={screenName}
        name="limit"
        label="Limit"
        description="By default limit 10, you can adjust what you want."
        placeholder="Input limit refetch data"
        type="number"
      />

      <Button
        {...testProps(tid(id, 'RefetchButton'))}
        type="submit"
      >
        Refetch Data
      </Button>
    </AppForm>
  );
};

export default RefetchForm;