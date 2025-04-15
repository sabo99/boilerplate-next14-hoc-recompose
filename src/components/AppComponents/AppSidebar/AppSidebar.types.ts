import { Sidebar } from '@/components/ui/sidebar';
import { Props as withAuthProps } from '@/composers/withAuth/withAuth.types';

export type Props = React.ComponentProps<typeof Sidebar> & {
  screenName: string;
  permissions: string[];
} & withAuthProps;