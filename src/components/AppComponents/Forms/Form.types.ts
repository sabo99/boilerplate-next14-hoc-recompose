import { UseFormReturn } from 'react-hook-form';

export type FormProps = {
  screenName: string;
  name: string;
  form: UseFormReturn<any>;
  onSubmit: (payload: any) => Promise<void>;
}