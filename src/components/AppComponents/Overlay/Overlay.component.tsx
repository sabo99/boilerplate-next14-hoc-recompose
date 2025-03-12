import * as React from 'react';

import { testProps, tid } from '@/lib/utils';

import AppAlertDialog from '../AppAlertDialog';
import LoadingDots from '../LoadingDots';
import LoadingSpinner from '../LoadingSpinner';
import OverlayConfig from './Overlay.config';
import {
  StyledContainer,
  StyledContainerWithoutOpacity,
  StyledContent
} from './Overlay.styles';
import type { Props } from './Overlay.types';

const Overlay: React.FC<Props> = ({
  screenName,
  overlayState = 'LOADING',
  loaderType,
  callbacks,
  alertDialog: appAlertDialogOptions
}) => {
  const ContainerComponent = overlayState === 'LOADING' ? StyledContainer : StyledContainerWithoutOpacity;
  const testId = tid(screenName, OverlayConfig.componentName);
  const { setIdleOverlay } = callbacks;

  const handleIdleOverlayChange = React.useCallback(() => {
    setIdleOverlay(false);
  }, [setIdleOverlay]);

  const renderLoadingContent = () => {
    return loaderType === 'DOTS'
      ? <LoadingDots screenName={testId} />
      : <LoadingSpinner screenName={testId} />;
  };

  const renderIdleContent = () => (
    <AppAlertDialog
      screenName={testId}
      onConfirm={handleIdleOverlayChange}
      onCancel={handleIdleOverlayChange}
      {...appAlertDialogOptions}
    />
  );

  const renderContent = overlayState === 'LOADING'
    ? renderLoadingContent
    : renderIdleContent;

  return (
    <ContainerComponent {...testProps(tid(testId, 'StyledContainer'))}>
      <StyledContent {...testProps(tid(testId, 'StyledContent'))}>
        {renderContent()}
      </StyledContent>
    </ContainerComponent>
  );
};

export default Overlay;
