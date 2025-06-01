import {
  DatabaseZapIcon,
  LoaderIcon,
  LogInIcon,
  MonitorPauseIcon,
  RefreshCwOffIcon,
  ShieldCheckIcon
} from 'lucide-react';

const examples = [
  {
    icon: LoaderIcon,
    title: 'withLoadingOverlay',
    description: 'Displays a loading overlay while waiting for async tasks.'
  },
  {
    icon: MonitorPauseIcon,
    title: 'withIdleOverlay',
    description: 'Triggers an overlay when user is idle for too long.'
  },
  {
    icon: RefreshCwOffIcon,
    title: 'withPreventRefresh',
    description: 'Prevents page refreshes to protect unsaved state/data.'
  },
  {
    icon: DatabaseZapIcon,
    title: 'withDataFetching',
    description: 'Handles API data fetching with loading and error fallback.'
  },
  {
    icon: LogInIcon,
    title: 'withAuthentication',
    description: 'Guards routes and redirects based on authentication state.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'withStepUpVerification',
    description: 'Adds extra verification steps for sensitive actions.'
  }
];

const Config = {
  examples
};

export default Config;