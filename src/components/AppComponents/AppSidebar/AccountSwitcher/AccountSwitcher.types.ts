import type { Account } from '@/components/AppComponents/AccountInfo/AccountInfo.types';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';

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
  activeAccount: Account;
  setActiveAccount: React.Dispatch<React.SetStateAction<Account>>;
}
