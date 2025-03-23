import { generateRandomString } from '@sabo99/node-utils';

import {
  AudioWaveformIcon,
  CommandIcon,
  DatabaseZapIcon,
  GalleryVerticalEndIcon,
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
    avatar: GalleryVerticalEndIcon,
    groupId: 'Enterprise01',
    sessionId: generateRandomString(10)
  },
  {
    name: 'Acme Corp.',
    avatar: AudioWaveformIcon,
    groupId: 'Enterprise01',
    sessionId: generateRandomString(10)
  },
  {
    name: 'Evil Corp.',
    avatar: CommandIcon,
    groupId: 'Enterprise01',
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