import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

export type Account = {
  // avatar: React.ElementType;
  sessionId?: string;
  name: string;
  email: string;
  photo: string;
}

export type StyledDropdownMenuContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>,
  'side'
> & {
  isMobile?: boolean;
}

export type Props = {
  screenName: string;
  isMobile: boolean;
  accounts: Account[];
}
