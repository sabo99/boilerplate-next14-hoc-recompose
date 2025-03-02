import React from 'react';

import { cn } from '@/lib/utils';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'flex justify-center items-center h-full'
    },
    props.children
  );

export const StyledSpinner: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  size: string;
}> = ({ size, ...props }) =>
    React.createElement(
      'div',
      {
        ...props,
        className: cn(size, 'border-gray-300 border-t-blue-500 rounded-full animate-spin')
      }
    );
