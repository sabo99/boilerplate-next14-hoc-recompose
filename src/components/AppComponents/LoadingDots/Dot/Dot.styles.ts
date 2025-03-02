import React from 'react';

import { cn } from '@/lib/utils';

export const StyledDot: React.FC<React.HTMLAttributes<HTMLSpanElement> & {
  size?: string | number;
  margin?: string | number;
}> =
  ({ className, size, margin, ...props }) =>
    React.createElement(
      'span',
      {
        ...props,
        className: cn('inline-block rounded-full', className),
        style: { width: size, height: size, margin: `0 ${margin}` }
      },
      props.children
    );