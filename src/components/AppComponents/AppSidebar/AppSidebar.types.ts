import { Sidebar } from '@/components/ui/sidebar';
import { ComposedAuthProps, ComposedDefaultPropsOptions } from '@/types';

export type Props =
  React.ComponentProps<typeof Sidebar> &
  ComposedDefaultPropsOptions &
  ComposedAuthProps;