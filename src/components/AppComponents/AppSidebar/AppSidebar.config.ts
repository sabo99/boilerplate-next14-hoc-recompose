import { generateRandomString } from '@sabo99/node-utils';
import {
  DatabaseZapIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  MonitorDotIcon,
  RefreshCwOffIcon,
  SquareTerminalIcon,
  ViewIcon
} from 'lucide-react';

import Constants from '@/constants';
import { cn } from '@/lib/utils';

import accounts from '../../../../data/accounts.json';

const mapAccounts = accounts.map((account) => ({
  ...account,
  sessionId: generateRandomString(12),
  fullName: cn(account.firstName, account.lastName)
}));

const { Paths } = Constants;

const appSidebarData = {
  user: mapAccounts[0],
  accounts: mapAccounts,
  navMain: [
    {
      title: 'Overviews',
      url: Paths.Dashboard,
      icon: ViewIcon,
      isActive: true,
      subItems: [
        {
          title: 'Dashboard',
          url: Paths.Dashboard,
          icon: LayoutDashboardIcon,
          permission: 'VIEW_DASHBOARD'
        }
      ]
    },
    {
      title: 'Examples',
      url: '#',
      icon: SquareTerminalIcon,
      isActive: true,
      subItems: [
        {
          title: 'withLoadingOverlay',
          url: Paths.Examples.WithLoadingOverlay,
          icon: LoaderIcon,
          permission: 'VIEW_LOADING_OVERLAY'
        },
        {
          title: 'withIdleOverlay',
          url: Paths.Examples.WithIdleOverlay,
          icon: MonitorDotIcon,
          permission: 'VIEW_IDLE_OVERLAY'
        },
        {
          title: 'withPreventRefresh',
          url: '#',
          icon: RefreshCwOffIcon,
          permission: 'VIEW_PREVENT_REFRESH'
        },
        {
          title: 'withDataFetching',
          url: Paths.Examples.WithDataFetching,
          icon: DatabaseZapIcon,
          permission: 'VIEW_DATA_FETCHING'
        }
      ]
    }
  ]
};

const getFilteredNavMain = (userPermissions: string[]) => {
  return appSidebarData.navMain
    .map(({ subItems, ...menu }) => ({
      ...menu,
      subItems: subItems.filter(sub => userPermissions?.includes(sub.permission))
    }))
    .filter(menu => menu.subItems.length); // Remove menus without sub-items
};

const config = {
  appSidebarData,
  getFilteredNavMain
};

export default config;