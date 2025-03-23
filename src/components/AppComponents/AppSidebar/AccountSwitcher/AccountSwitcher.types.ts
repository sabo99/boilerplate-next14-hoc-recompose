import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

type Account = {
  avatar: React.ElementType;
  sessionId?: string;
  name: string;
  groupId: string;
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
