import * as React from 'react';

import AppNavMain from '@/components/AppComponents/AppNavMain';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import AppSidebarConfig from './AppSidebar.config';

const { appSidebarData } = AppSidebarConfig;

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar> & {
  screenName: string, permissions: string[], isFilteredByPermission: boolean
}> = ({ screenName, permissions: userPermissions, isFilteredByPermission = true, ...props }) => {

  const getFilteredNavMain = () =>
    appSidebarData.navMain
      .map(({ subItems, ...menu }) => ({
        ...menu,
        subItems: subItems.filter(sub => userPermissions.includes(sub.permission))
      }))
      .filter(menu => menu.subItems.length); // Remove menus without sub-items

  const navMain = isFilteredByPermission ? getFilteredNavMain() : appSidebarData.navMain;

  return (
    <Sidebar
      collapsible="icon"
      {...testProps(tid(screenName, 'Sidebar'))}
      {...props}>
      <SidebarHeader {...testProps(tid(screenName, 'SidebarHeader'))}>
        <TeamSwitcher teams={appSidebarData.teams} />
      </SidebarHeader>
      <SidebarContent {...testProps(tid(screenName, 'SidebarContent'))}>
        <AppNavMain screenName={screenName} items={navMain} />
      </SidebarContent>
      <SidebarFooter {...testProps(tid(screenName, 'SidebarFooter'))}>
        <NavUser user={appSidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
