import React from 'react';
import { compose, withState } from 'react-recompose';

import AppSidebar from '@/components/AppComponents/AppSidebar';
import AppSidebarInset from '@/components/AppComponents/AppSidebarInset';
import { SidebarProvider } from '@/components/ui/sidebar';

import { Props } from './withSidebar.types';

const ComposedSidebar = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const { screenName, permissions, enabledSidebar } = props;

    return enabledSidebar &&
      <SidebarProvider>
        <AppSidebar
          screenName={screenName}
          permissions={permissions}
        />
        <AppSidebarInset {...props}>
          <ComposedComponent {...props} />
        </AppSidebarInset>
      </SidebarProvider>;
  };

  return HOC;
};

const withSidebar = () => compose(
  withState('enabledSidebar', 'setEnabledSidebar', true),
  ComposedSidebar
);

export default withSidebar;