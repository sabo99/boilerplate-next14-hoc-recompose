import * as React from 'react';

import { testProps, tid } from '@/lib/utils';

import LoadingDots from '../LoadingDots';
import LoadingSpinner from '../LoadingSpinner';
import OverlayConfig from './Overlay.config';
import {
  StyledContainer,
  StyledContent
} from './Overlay.styles';
import type { Props } from './Overlay.types';

const { componentName } = OverlayConfig;

const Overlay: React.FC<Props> = ({ screenName, overlayState, loaderType }) => {
  const testId = tid(screenName, componentName);

  return (
    <StyledContainer {...testProps(tid(testId, 'StyledContainer'))}>
      <StyledContent {...testProps(tid(testId, 'StyledContent'))}>
        {overlayState === 'LOADING'
          ? (loaderType === 'DOTS' ? <LoadingDots screenName={testId} /> : <LoadingSpinner screenName={testId} />)
          : 'IDLE CONTENT'
        }
      </StyledContent>
    </StyledContainer>
  );
};

export default Overlay;