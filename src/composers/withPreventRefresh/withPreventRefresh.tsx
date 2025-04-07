import { redirect, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useBeforeunload } from 'react-beforeunload';

import type { Options } from './withPreventRefresh.types';

const withPreventRefresh = (options: Options) => (ComposedComponent: React.ComponentType<any>) => {
  const HOCPreventRefresh = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const { redirectPath, alertDialogOption } = options;

    React.useEffect(() => {
      if (pathname === redirectPath) {
        router.prefetch(redirectPath);
        return;
      }

      redirect(redirectPath);
    }, [pathname, redirectPath, router]);

    const renderAlertDialog = () => {
      return null;
    };

    useBeforeunload((event) => {
      if (alertDialogOption) {
        return;
      }
      event.preventDefault();
    });

    return (
      <div>
        <ComposedComponent {...props} />
        {alertDialogOption && renderAlertDialog()}

      </div>
    );
  };

  return HOCPreventRefresh;
};

export default withPreventRefresh;