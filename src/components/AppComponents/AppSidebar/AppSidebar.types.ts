import type { Account } from '@/components/AppComponents/AccountInfo/AccountInfo.types';
import { Sidebar } from '@/components/ui/sidebar';

export type Props = React.ComponentProps<typeof Sidebar> & {
  screenName: string,
  permissions: string[],
  accounts: Account[],
  activeAccount: Account,
  setActiveAccount: React.Dispatch<React.SetStateAction<Account>>,
}