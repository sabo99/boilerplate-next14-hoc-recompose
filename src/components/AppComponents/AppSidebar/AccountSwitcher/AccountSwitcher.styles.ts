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

export const StyledContainerAvatar: React.FC<React.ComponentProps<'div'>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: `flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary
       text-sidebar-primary-foreground`
    },
    props.children
  );

export const StyledContainerAccountInfo: React.FC<React.ComponentProps<'div'>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'grid flex-1 text-left text-sm leading-tight'
    },
    props.children
  );

export const StyledContainerAccountName: React.FC<React.ComponentProps<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'truncate font-semibold'
    },
    props.children
  );

export const StyledContainerAccountGroupId: React.FC<React.ComponentProps<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'truncate text-xs'
    },
    props.children
  );

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
