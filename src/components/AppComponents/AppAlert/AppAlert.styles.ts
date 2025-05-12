import React from 'react';

import { Alert } from '@/components/ui/alert';

import { StyledAlertIconProps, StyledAlertProps } from './AppAlert.types';

export const StyledAlert = React.forwardRef<
  React.ElementRef<typeof Alert>,
  StyledAlertProps
>(({ className, ...props }, ref) =>
  React.createElement(Alert, {
    ...props,
    className: className || 'w-[400px] max-w-full self-center',
    ref
  })
);
StyledAlert.displayName = 'StyledAlert';

export const StyledIcon: React.FC<StyledAlertIconProps> = ({ icon, ...props }) =>
  React.createElement(
    icon as any,
    {
      ...props,
      className: 'h-4 w-4'
    }
  );
