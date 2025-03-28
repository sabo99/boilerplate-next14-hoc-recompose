import { generateRandomString } from '@sabo99/node-utils';

import {
  DatabaseZapIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  MonitorDotIcon,
  RefreshCwOffIcon,
  SquareTerminalIcon,
  ViewIcon
} from '@/__mocks__/lucide-react';

const accounts = [
  {
    name: 'Acme Inc',
    email: 'acme.inc@gmail.com',
    photo: '/photo-1.png',
    sessionId: generateRandomString(10)
  },
  {
    name: 'Acme Corp.',
    email: 'acme.corp@gmail.com',
    photo: '/photo-2.png',
    sessionId: generateRandomString(10)
  },
  {
    name: 'Evil Corp.',
    email: 'evil.corp@gmail.com',
    photo: '/photo-3.png',
    sessionId: generateRandomString(10)
  }
];

const navMainItemData = [
  {
    title: 'Overviews',
    url: '/Dashboard',
    icon: ViewIcon,
    isActive: true,
    subItems: [
      {
        title: 'Dashboard',
        url: '/Dashboard',
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
        url: '/with-loading-overlay',
        icon: LoaderIcon,
        permission: 'VIEW_LOADING_OVERLAY'
      },
      {
        title: 'withIdleOverlay',
        url: '/with-idle-overlay',
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
        url: '#',
        icon: DatabaseZapIcon,
        permission: 'VIEW_DATA_FETCHING'
      }
    ]
  }
];

export {
  accounts,
  navMainItemData
};