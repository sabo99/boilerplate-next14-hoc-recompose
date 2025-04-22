import { Control, FieldValues } from 'react-hook-form';

export type Props<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  screenName: string;
  name: string;
  label: string;
  description: string;
  control: Control<TFieldValues, TContext>;
} & React.InputHTMLAttributes<HTMLInputElement>