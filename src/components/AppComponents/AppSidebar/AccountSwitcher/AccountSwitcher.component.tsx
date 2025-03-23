import { ChevronsUpDownIcon, UserRoundCheckIcon } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import {
  StyledContainerAccountGroupId,
  StyledContainerAccountInfo,
  StyledContainerAccountName,
  StyledContainerAvatar,
  StyledDropdownMenuContent,
  StyledSidebarMenuButton
} from './AccountSwitcher.styles';
import { Props } from './AccountSwitcher.types';

const AccountSwitcher: React.FC<Props> = ({ screenName, isMobile, accounts }) => {
  const [activeAccount, setActiveAccount] = React.useState(accounts[0]);

  const renderAccountInfo = () => (
    <StyledContainerAccountInfo>
      <StyledContainerAccountName {...testProps(tid(screenName, 'ActiveAccountName'))}>
        {activeAccount.name}
      </StyledContainerAccountName>
      <StyledContainerAccountGroupId {...testProps(tid(screenName, 'ActiveAccountGroupID'))}>
        {activeAccount.groupId}
      </StyledContainerAccountGroupId>
    </StyledContainerAccountInfo>
  );

  const renderDropdownMenuContent = () => (
    <StyledDropdownMenuContent
      {...testProps(tid(screenName, 'StyledDropdownMenuContent'))}
      isMobile={isMobile}
    >
      <DropdownMenuLabel className="text-xs text-muted-foreground">
        Accounts
      </DropdownMenuLabel>
      {accounts.map((acount, index) => (
        <DropdownMenuItem
          {...testProps(tid(screenName, 'DropdownMenuItem', index.toString()))}
          key={index}
          onClick={() => setActiveAccount(acount)}
          className="gap-2 p-2"
        >
          <div className="flex size-6 items-center justify-center rounded-sm border">
            <acount.avatar className="size-4 shrink-0" />
          </div>
          {acount.name}
          <DropdownMenuShortcut>
            <UserRoundCheckIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
    </StyledDropdownMenuContent>
  );

  return (
    <SidebarMenu {...testProps(tid(screenName, 'SidebarMenu'))}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StyledSidebarMenuButton>
              <StyledContainerAvatar>
                <activeAccount.avatar className="size-4" />
              </StyledContainerAvatar>
              {renderAccountInfo()}
              <ChevronsUpDownIcon className="ml-auto" />
            </StyledSidebarMenuButton>
          </DropdownMenuTrigger>
          {renderDropdownMenuContent()}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AccountSwitcher;