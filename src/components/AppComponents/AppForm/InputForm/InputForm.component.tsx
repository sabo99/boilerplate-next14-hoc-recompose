import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { testProps, tid } from '@/lib/utils';

import { Props } from './InputForm.types';

const InputForm: React.FC<Props> = (props) => {
  const { screenName, name, label, description, placeholder, type, control } = props;
  const id = tid(screenName, name);

  return (
    <FormField
      {...testProps(tid(id, 'FormField'))}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              name={name}
              type={type}
            />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;