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
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEndIcon,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveformIcon,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: CommandIcon,
      plan: 'Free'
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

const config = {
  appSidebarData
};

export default config;