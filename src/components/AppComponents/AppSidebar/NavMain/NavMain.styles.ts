import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

export const StyledChevronRightIcon: React.FC<React.SVGAttributes<SVGAElement>> = () =>
  React.createElement(
    ChevronRightIcon,
    {
      className: 'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
    }
  );