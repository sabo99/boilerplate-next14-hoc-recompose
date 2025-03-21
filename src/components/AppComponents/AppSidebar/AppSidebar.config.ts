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
} from 'lucide-react';

import Constants from '@/constants';

const { Paths } = Constants;

const appSidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: ''
  },
  accounts: [
    {
      name: 'Acme Inc',
      avatar: GalleryVerticalEndIcon,
      groupId: 'Enterprise01'
    },
    {
      name: 'Acme Corp.',
      avatar: AudioWaveformIcon,
      groupId: 'Enterprise01'
    },
    {
      name: 'Evil Corp.',
      avatar: CommandIcon,
      groupId: 'Enterprise01'
    }
  ],
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
          url: '#',
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
      subItems: subItems.filter(sub => userPermissions.includes(sub.permission))
    }))
    .filter(menu => menu.subItems.length); // Remove menus without sub-items
};

const config = {
  appSidebarData,
  getFilteredNavMain
};

export default config;