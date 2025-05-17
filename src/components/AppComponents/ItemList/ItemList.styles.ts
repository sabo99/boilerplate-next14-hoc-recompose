import React from 'react';

import { cn } from '@/lib/utils';

export const StyledList: React.FC<React.HTMLAttributes<HTMLUListElement>> = (props) =>
  React.createElement(
    'ul',
    {
      ...props,
      className: cn('list-disc pl-5 space-y-1 marker:text-blue-500', props.className)
    },
    props.children
  );

export const StyledItem: React.FC<React.HTMLAttributes<HTMLLIElement> & { text: string }> = ({ text, ...props }) =>
  React.createElement(
    'li',
    {
      ...props
    },
    text
  );

