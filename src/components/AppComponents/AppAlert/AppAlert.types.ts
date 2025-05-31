import { LucideIcon } from 'lucide-react';
import React from 'react';

import { Alert } from '@/components/ui/alert';

export interface Props {
  screenName: string;
  className?: string;
  title: string;
  message: string;
  variant?: 'default' | 'destructive';
  icon?: LucideIcon;
}

export type StyledAlertProps = React.ComponentPropsWithoutRef<typeof Alert>;

export interface StyledAlertIconProps {
  className?: string;
  icon?: LucideIcon;
}
