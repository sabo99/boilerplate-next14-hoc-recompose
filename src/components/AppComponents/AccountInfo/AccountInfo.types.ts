import { Account } from '@/components/AppComponents/AppSidebar/AccountSwitcher/AccountSwitcher.types';

export type Props = {
  screenName: string;
  user: Account
  icon?: React.ReactNode;
  avatarFallback?: React.ReactNode;
}