import React from 'react';

export const StyledOrderList = (props: any) =>
  React.createElement(
    'ol',
    {
      ...props,
      className: 'list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'
    },
    props.children);

export const StyledListItem = (props: any) =>
  React.createElement('li', { ...props }, props.children);

export const StyledAnchor = (props: any) =>
  React.createElement(
    'a',
    {
      ...props,
      className: 'ml-1 bg-black/[.05] dark:bg-white/[.06] hover:bg-blue-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded font-semibold'
    },
    props.children);