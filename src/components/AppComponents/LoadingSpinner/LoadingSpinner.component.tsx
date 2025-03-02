import { testProps, tid } from '@/lib/utils';

import LoadingSpinnerConfig from './LoadingSpinner.config';
import { StyledContainer, StyledSpinner } from './LoadingSpinner.styles';
import type { Props } from './LoadingSpinner.types';

const { sizeClasses, componentName } = LoadingSpinnerConfig;

const LoadingSpinner: React.FC<Props> = ({ screenName, size = 'medium' }) => {
  const testId = tid(screenName, componentName);
  return (
    <StyledContainer {...testProps(tid(testId, 'StyledContainer'))}>
      <StyledSpinner {...testProps(tid(testId, 'StyledSpinner'))} size={sizeClasses[size]} />
    </StyledContainer>
  );
};

export default LoadingSpinner;