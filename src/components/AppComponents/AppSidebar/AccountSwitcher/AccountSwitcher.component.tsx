import { ChevronsUpDownIcon, GalleryVerticalEndIcon } from 'lucide-react';
import * as React from 'react';

import AccountInfo from '@/components/AppComponents/AccountInfo';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import {
  StyledDropdownMenuContent,
  StyledSidebarMenuButton
} from './AccountSwitcher.styles';
import type { Props } from './AccountSwitcher.types';

const AccountSwitcher: React.FC<Props> = ({ screenName, isMobile, accounts }) => {
  const [activeAccount, setActiveAccount] = React.useState(accounts[0]);

  const renderDropdownMenuContent = () => (
    <StyledDropdownMenuContent
      {...testProps(tid(screenName, 'StyledDropdownMenuContent'))}
      isMobile={isMobile}
    >
      <DropdownMenuLabel className="text-xs text-muted-foreground">
        Accounts
      </DropdownMenuLabel>
      {accounts.map((account, index) => (
        <DropdownMenuItem
          key={account.sessionId}
          onClick={() => setActiveAccount(account)}
          className="gap-2 p-2"
          {...testProps(tid(screenName, 'DropdownMenuItem', index.toString()))}
        >

          <AccountInfo
            screenName={screenName}
            user={account}
          />

          {activeAccount === account &&
            <DropdownMenuShortcut>
              <GalleryVerticalEndIcon size={16} color='black' />
            </DropdownMenuShortcut>
          }
        </DropdownMenuItem>
      ))}
    </StyledDropdownMenuContent>
  );

  return (
    <SidebarMenu {...testProps(tid(screenName, 'SidebarMenu'))}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <StyledSidebarMenuButton>

              <AccountInfo
                screenName={screenName}
                user={activeAccount}
                icon={<ChevronsUpDownIcon className="ml-auto size-4" />}
                avatarFallback={<GalleryVerticalEndIcon className="size-4 shrink-0" />}
              />

            </StyledSidebarMenuButton>
          </DropdownMenuTrigger>
          {renderDropdownMenuContent()}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AccountSwitcher;