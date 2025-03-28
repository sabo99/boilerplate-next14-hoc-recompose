import * as React from 'react';

import AccountSwitcher from '@/components/AppComponents/AppSidebar/AccountSwitcher';
import NavMain from '@/components/AppComponents/AppSidebar/NavMain';
import NavUser from '@/components/AppComponents/AppSidebar/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import AppSidebarConfig from './AppSidebar.config';
import type { Props } from './AppSidebar.types';

const { appSidebarData, getFilteredNavMain } = AppSidebarConfig;

const AppSidebar: React.FC<Props> = ({ screenName, permissions: userPermissions, ...props }) => {
  const { isMobile } = useSidebar();

  const navMain = getFilteredNavMain(userPermissions);

  return (
    <Sidebar
      collapsible="icon"
      {...testProps(tid(screenName, 'Sidebar'))}
      {...props}>
      <SidebarHeader {...testProps(tid(screenName, 'SidebarHeader'))}>
        <AccountSwitcher
          screenName={screenName}
          isMobile={isMobile}
          accounts={appSidebarData.accounts}
        />
      </SidebarHeader>
      <SidebarContent {...testProps(tid(screenName, 'SidebarContent'))}>
        <NavMain
          screenName={screenName}
          items={navMain}
        />
      </SidebarContent>
      <SidebarFooter {...testProps(tid(screenName, 'SidebarFooter'))}>
        <NavUser
          screenName={screenName}
          isMobile={isMobile}
          user={appSidebarData.user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
