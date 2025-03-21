import * as React from 'react';

import { testProps, tid } from '@/lib/utils';

import OverlayConfig from './Overlay.config';
import {
  StyledContainer,
  StyledContainerWithoutOpacity,
  StyledContent
} from './Overlay.styles';
import type { Props } from './Overlay.types';

const Overlay: React.FC<Props> = ({
  screenName,
  content,
  withoutOpacity = false
}) => {
  const ContainerComponent = !withoutOpacity ? StyledContainer : StyledContainerWithoutOpacity;
  const testId = tid(screenName, OverlayConfig.componentName);

  return (
    <ContainerComponent {...testProps(tid(testId, 'StyledContainer'))}>
      <StyledContent {...testProps(tid(testId, 'StyledContent'))}>
        {content}
      </StyledContent>
    </ContainerComponent>
  );
};

export default Overlay;
