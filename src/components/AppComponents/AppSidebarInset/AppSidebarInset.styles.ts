import React from 'react';

import { BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

export const StyledHeader: React.FC<React.ComponentProps<'header'>> = (props) =>
  React.createElement(
    'header',
    {
      ...props,
      className: 'flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'
    },
    props.children
  );

export const StyledHeaderContent: React.FC<React.ComponentProps<'div'>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'flex items-center gap-2 px-4'
    },
    props.children
  );

export const StyledSeparator: React.FC<React.ComponentProps<typeof Separator>> = (props) =>
  React.createElement(
    Separator,
    {
      ...props,
      orientation: 'vertical',
      className: 'mr-2 h-4'
    },
    props.children
  );

export const StyledBreadcrumbItem: React.FC<React.ComponentProps<typeof BreadcrumbItem>> = (props) =>
  React.createElement(
    BreadcrumbItem,
    {
      ...props,
      className: 'hidden md:block'
    },
    props.children
  );

export const StyledBreadcrumbSeparator: React.FC<React.ComponentProps<typeof BreadcrumbSeparator>> = (props) =>
  React.createElement(
    BreadcrumbSeparator,
    {
      ...props,
      className: 'hidden md:block'
    },
    props.children
  );
