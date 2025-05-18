import React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

import { StyledButtonProps } from './IdlePopup.types';

export const StyledPopupSubtitle: React.FC<React.HTMLAttributes<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'flex items-start text-base font-medium text-gray-700'
    },
    props.children
  );

export const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps & StyledButtonProps>(
  ({ ...props }, ref) =>
    React.createElement(Button, {
      ...props,
      className: 'w-full mt-4 px-4 py-2 rounded-lg',
      ref
    }, props.text)
);
StyledButton.displayName = 'StyledButton';

export const StyledTimerText: React.FC<React.HTMLAttributes<'span'>> = (props) =>
  React.createElement(
    'span',
    {
      ...props,
      className: 'mt-4 flex items-center justify-center w-full text-base font-medium text-gray-700'
    },
    props.children
  );