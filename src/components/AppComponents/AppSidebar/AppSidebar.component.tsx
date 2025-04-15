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

const { getFilteredNavMain } = AppSidebarConfig;

const AppSidebar: React.FC<Props> = (props) => {
  const { screenName, permissions: userPermissions, activeAccount } = props;
  const { isMobile } = useSidebar();

  const navMain = getFilteredNavMain(userPermissions);

  const renderHeader = () => (
    <SidebarHeader {...testProps(tid(screenName, 'SidebarHeader'))}>
      <AccountSwitcher
        isMobile={isMobile}
        {...props}
      />
    </SidebarHeader>
  );

  const renderContent = () => (
    <SidebarContent {...testProps(tid(screenName, 'SidebarContent'))}>
      <NavMain
        screenName={screenName}
        items={navMain}
      />
    </SidebarContent>
  );

  const renderFooter = () => activeAccount && (
    <SidebarFooter {...testProps(tid(screenName, 'SidebarFooter'))} >
      <NavUser
        isMobile={isMobile}
        {...props}
      />
    </SidebarFooter>
  );

  return (
    <Sidebar
      collapsible="icon"
      {...testProps(tid(screenName, 'Sidebar'))}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
