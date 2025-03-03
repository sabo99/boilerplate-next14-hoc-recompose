import {
  AudioWaveformIcon,
  CommandIcon,
  DatabaseZapIcon,
  GalleryVerticalEndIcon,
  LoaderIcon,
  RefreshCwOffIcon,
  SquareTerminalIcon
} from 'lucide-react';

import Paths from '@/constants/Paths';

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