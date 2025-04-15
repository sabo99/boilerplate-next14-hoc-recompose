import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Props as withAuthProps } from '@/composers/withAuth/withAuth.types';

export type StyledDropdownMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>,
  'side'
> & {
  isMobile?: boolean;
}

export type Props = {
  screenName: string;
  isMobile: boolean;
}& withAuthProps;
