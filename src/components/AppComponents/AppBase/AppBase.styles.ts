import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'items-center p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]'
    },
    props.children
  );

export const StyledCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    Card,
    {
      ...props,
      className: 'flex flex-col gap-2 items-center sm:items-stretch'
    },
    props.children
  );

export const StyledCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    CardFooter,
    {
      ...props,
      className: 'flex font-semibold leading-none tracking-tight'
    },
    props.children
  );

export const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) =>
  React.createElement(
    Button,
    {
      ...props,
      className: 'flex items-start',
      type: 'button',
      variant: 'link'
    },
    props.children
  );

export const StyledAnchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) =>
  React.createElement(
    'a',
    {
      ...props,
      href: 'https://ui.shadcn.com/',
      target: '_blank'
    },
    props.children
  );
