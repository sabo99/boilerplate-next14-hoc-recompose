import React from 'react';

export const StyledContainer: React.FC<React.HTMLAttributes<'div'>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'grid flex-1 text-left text-sm leading-tight'
    },
    props.children
  );

export const StyledUserName: React.FC<React.HTMLAttributes<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'truncate font-semibold'
    },
    props.children
  );

export const StyledUserEmail: React.FC<React.HTMLAttributes<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'truncate text-xs'
    },
    props.children
  );