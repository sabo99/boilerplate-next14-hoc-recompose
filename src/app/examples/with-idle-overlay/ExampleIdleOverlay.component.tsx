import React from 'react';

import AppBase from '@/components/AppComponents/AppBase';
import ItemList from '@/components/AppComponents/ItemList';
import { testProps, tid } from '@/lib/utils';

import ExampleIdleOverlayConfig from './ExampleIdleOverlay.config';
import { StyledContainer, StyledQuote, StyledTitle } from './ExampleIdleOverlay.styles';
import type { Props } from './ExampleIdleOverlay.types';

const { defaultValue, detections } = ExampleIdleOverlayConfig;

const ExampleIdleOverlay: React.FC<Props> = ({
  screenName, pageTitle, idleTimeout
}) => {
  const pageDescription = defaultValue.decriptionOnIdle(idleTimeout / 1000);

  return (
    <AppBase
      screenName={screenName}
      title={pageTitle}
      description={pageDescription}
    >
      <StyledContainer {...testProps(tid(screenName, 'StyledContainer'))}>
        <StyledTitle
          text="Detected activity includes:"
          {...testProps(tid(screenName, 'StyledTitle'))}
        />
        <ItemList
          screenName={screenName}
          items={detections}
        />
        <StyledQuote
          text="Please interact with the page to stay connected."
          {...testProps(tid(screenName, 'StyledQuote'))}
        />
      </StyledContainer>
    </AppBase>

  );
};

export default ExampleIdleOverlay;