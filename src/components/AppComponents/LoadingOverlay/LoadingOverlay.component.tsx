import * as React from 'react';

import { testProps } from '@/lib/utils';

import LoadingDots from '../LoadingDots';
import { LoadingSpinner } from '../LoadingSpinner';
import LoadingOverlayConfig from './LoadingOverlay.config';
import {
  StyledContainer,
  StyledContent
} from './LoadingOverlay.styles';
import type { Props } from './LoadingOverlay.types';

const { componentName } = LoadingOverlayConfig;

const LoadingOverlay: React.FC<Props> = ({ variant }) => {
  return (
    <StyledContainer {...testProps(componentName)}>
      <StyledContent>
        {(
          variant === 'DOTS'
            ? <LoadingDots screenName={componentName} />
            : <LoadingSpinner screenName={componentName} />
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default LoadingOverlay;