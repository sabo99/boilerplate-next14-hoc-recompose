import { joinWith, testProps, tid } from '@/lib/utils';

import Dot from './Dot';
import config from './LoadingDots.config';
import { StyledContainer } from './LoadingDots.styles';
import type { Props } from './LoadingDots.types';

const { componentName, Dots } = config;

const LoadingDots: React.FC<Props> = ({ screenName }) => {
  const testId = tid(screenName, componentName);

  return (
    <StyledContainer
      {...testProps(tid(testId, 'StyledContainer'))}>
      {Dots.map((dot, index) => (
        <Dot
          key={index}
          className={dot.className}
          screenName={screenName}
          name={joinWith([componentName, dot.name], '_')} />
      ))}
    </StyledContainer>
  );
};

export default LoadingDots;