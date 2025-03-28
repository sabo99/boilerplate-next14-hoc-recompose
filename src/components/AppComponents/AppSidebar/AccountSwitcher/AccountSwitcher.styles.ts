import React from 'react';

import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';

import { StyledDropdownMenuContentProps } from './AccountSwitcher.types';

export const StyledSidebarMenuButton = React.forwardRef<
  React.ElementRef<typeof SidebarMenuButton>,
  React.ComponentPropsWithoutRef<typeof SidebarMenuButton>
>((props, ref) =>
  React.createElement(SidebarMenuButton, {
    ...props,
    ref,
    size: 'lg',
    className: 'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
  })
);

StyledSidebarMenuButton.displayName = 'StyledSidebarMenuButton';

export const StyledDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  StyledDropdownMenuContentProps
>(({ isMobile, ...props }, ref) =>
  React.createElement(DropdownMenuContent, {
    ...props,
    ref,
    className: 'w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg',
    align: 'start',
    side: isMobile ? 'bottom' : 'right',
    sideOffset: 4
  })
);

StyledDropdownMenuContent.displayName = 'StyledDropdownMenuContent';
