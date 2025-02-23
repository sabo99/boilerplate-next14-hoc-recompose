import * as React from 'react';

import { testProps } from '@/lib/utils';

import LoadingDots from '../LoadingDots';
import config from './LoadingOverlay.config';
import {
  LoadingOverlayContainer,
  LoadingOverlayContent
} from './LoadingOverlay.style';

const { COMPONENT_NAME } = config;

const LoadingOverlay: React.FC = () => (
  <div
    {...testProps(COMPONENT_NAME)}
    className={LoadingOverlayContainer} >
    <div className={LoadingOverlayContent}>
      <LoadingDots
        screenName={COMPONENT_NAME} />
    </div>
  </div >
);

export default LoadingOverlay;