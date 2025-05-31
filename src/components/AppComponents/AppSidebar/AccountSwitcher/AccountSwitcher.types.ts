import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { ComposedAuthProps, ComposedDefaultPropsOptions } from '@/types';

export type StyledDropdownMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>,
  'side'
> & {
  isMobile?: boolean;
}
export type Props = ComposedDefaultPropsOptions & ComposedAuthProps & {
  isMobile: boolean;
};
