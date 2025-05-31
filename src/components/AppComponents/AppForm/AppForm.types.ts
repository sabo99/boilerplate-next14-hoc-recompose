import { UseFormReturn } from 'react-hook-form';

export type Props = {
  screenName: string;
  name: string;
  form: UseFormReturn<any, any, undefined>;
  onSubmit: (payload: any) => Promise<void>;
  children: React.ReactNode;
}