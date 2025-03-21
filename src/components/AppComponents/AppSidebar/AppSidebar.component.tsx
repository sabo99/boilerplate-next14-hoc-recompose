import * as React from 'react';

import AccountSwitcher from '@/components/AppComponents/AppSidebar/AccountSwitcher';
import NavMain from '@/components/AppComponents/AppSidebar/NavMain';
import NavUser from '@/components/AppComponents/AppSidebar/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import AppSidebarConfig from './AppSidebar.config';

const { appSidebarData, getFilteredNavMain } = AppSidebarConfig;

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar> & {
  screenName: string, permissions: string[]
}> = ({ screenName, permissions: userPermissions,  ...props }) => {

  const navMain = getFilteredNavMain(userPermissions);

  return (
    <Sidebar
      collapsible="icon"
      {...testProps(tid(screenName, 'Sidebar'))}
      {...props}>
      <SidebarHeader {...testProps(tid(screenName, 'SidebarHeader'))}>
        <AccountSwitcher accounts={appSidebarData.accounts} />
      </SidebarHeader>
      <SidebarContent {...testProps(tid(screenName, 'SidebarContent'))}>
        <NavMain screenName={screenName} items={navMain} />
      </SidebarContent>
      <SidebarFooter {...testProps(tid(screenName, 'SidebarFooter'))}>
        <NavUser user={appSidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
