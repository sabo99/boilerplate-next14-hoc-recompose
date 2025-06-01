import { UseFormReturn } from 'react-hook-form';

import type { AppDialogOption } from '@/types';

export type Props = {
  screenName: string;
  name: string;
  form: UseFormReturn<any, any, undefined>;
  onSubmit: (payload: any) => any;
  appDialogOption?: AppDialogOption;
}