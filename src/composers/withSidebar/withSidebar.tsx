import React from 'react';
import { compose, withProps } from 'react-recompose';

import AppSidebar from '@/components/AppComponents/AppSidebar';
import AppSidebarInset from '@/components/AppComponents/AppSidebarInset';
import { SidebarProvider } from '@/components/ui/sidebar';

import { Options, Props } from './withSidebar.types';

const ComposedSidebar = (ComposedComponent: React.ComponentType<Props>) => {
  const HOC = (props: Props) => {
    const { screenName, permissions, isFilteredByPermission } = props;
    return (
      <SidebarProvider>
        <AppSidebar
          screenName={screenName}
          permissions={permissions}
          isFilteredByPermission={isFilteredByPermission}
        />
        <AppSidebarInset {...props}>
          <ComposedComponent {...props} />
        </AppSidebarInset>
      </SidebarProvider>
    );
  };

  return HOC;
};

const withSidebar = (options: Options) => compose(
  withProps(options),
  ComposedSidebar
);

export default withSidebar;