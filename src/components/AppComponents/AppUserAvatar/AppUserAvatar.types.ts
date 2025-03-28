import React from 'react';

import { Account } from '@/components/AppComponents/AppSidebar/AccountSwitcher/AccountSwitcher.types';

export type Props = {
  screenName: string;
  user: Account;
  avatarFallback?: React.ReactNode;
}