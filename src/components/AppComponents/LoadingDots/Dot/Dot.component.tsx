import React from 'react';

import { testProps, tid } from '@/lib/utils';

import config from './Dot.config';
import { StyledDot } from './Dot.styles';
import type { Props } from './Dot.types';

const { componentName, DOT_DIAMETER, calculateMargin } = config;

const Dot: React.FC<Props> = ({
  screenName,
  name,
  className,
  size
}) => {
  const testId = tid(screenName, name, componentName);
  const dotSize = size ? `${size}px` : `${DOT_DIAMETER}px`;
  const margin = size ? `${calculateMargin(size)}px` : `${calculateMargin(DOT_DIAMETER)}px`;
  const props = { className, margin, size: dotSize, ...testProps(testId) };

  return (
    <StyledDot
      {...props}
    />
  );
};

export default Dot;