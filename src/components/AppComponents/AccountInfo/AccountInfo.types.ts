import type { Account } from '@/types';

export interface Props {
  screenName: string;
  user?: Account;
  icon?: React.ReactNode;
  avatarFallback?: React.ReactNode;
}