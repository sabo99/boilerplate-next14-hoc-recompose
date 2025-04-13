import { ChevronsUpDownIcon, GalleryVerticalEndIcon, UserRoundCheckIcon } from 'lucide-react';
import * as React from 'react';

import AccountInfo from '@/components/AppComponents/AccountInfo';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
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

const AccountSwitcher: React.FC<Props> = ({
  screenName, isMobile, accounts, activeAccount, setActiveAccount
}) => {
  const maxAccount = 3;

  const renderAccounts = () => (
    accounts && accounts.map((account, index) => (
      <DropdownMenuItem
        key={index}
        onClick={() => setActiveAccount(account)}
        className="gap-2 p-2"
        {...testProps(tid(screenName, 'DropdownMenuItem', index.toString()))}
      >

        <AccountInfo
          screenName={tid(screenName, index.toString())}
          user={account}
        />

        {activeAccount && activeAccount.email === account.email &&
          <DropdownMenuShortcut>
            <UserRoundCheckIcon
              {...testProps(tid(screenName, 'UserRoundCheckIcon'))}
              size={16}
              color="green"
              strokeWidth="2.5"
            />
          </DropdownMenuShortcut>
        }
      </DropdownMenuItem>
    ))
  );

  const renderDropdownMenuContent = () => (
    <StyledDropdownMenuContent
      {...testProps(tid(screenName, 'StyledDropdownMenuContent'))}
      isMobile={isMobile}
    >
      <DropdownMenuLabel className="text-xs text-muted-foreground inline-flex">
        Accounts
      </DropdownMenuLabel>

      {renderAccounts()}

      <Separator className='my-1' />
      <DropdownMenuItem
        {...testProps(tid(screenName, 'DropdownMenuItem'))}
        className="gap-2"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {accounts && accounts.length >= maxAccount ? 'Account has maximum extended' : 'Add Account'}
        </DropdownMenuLabel>
      </DropdownMenuItem>
    </StyledDropdownMenuContent>
  );

  const renderDropdownMenuTrigger = () => (
    <DropdownMenuTrigger asChild>
      <StyledSidebarMenuButton>

        <AccountInfo
          screenName={tid(screenName, 'ActiveAccount')}
          user={activeAccount}
          icon={<ChevronsUpDownIcon className="ml-auto size-4" />}
          avatarFallback={<GalleryVerticalEndIcon className="size-4 shrink-0" />}
        />

      </StyledSidebarMenuButton>
    </DropdownMenuTrigger>
  );

  return (
    <SidebarMenu {...testProps(tid(screenName, 'SidebarMenu'))}>
      <SidebarMenuItem>
        <DropdownMenu>
          {renderDropdownMenuTrigger()}
          {renderDropdownMenuContent()}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AccountSwitcher;