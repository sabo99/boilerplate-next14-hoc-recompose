import { LinkIcon } from 'lucide-react';
import React from 'react';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { testProps, tid } from '@/lib/utils';

import AppBaseConfig from './AppBase.config';
import { StyledAnchor, StyledButton, StyledCard, StyledCardFooter, StyledContainer } from './AppBase.styles';
import type { Props } from './AppBase.types';

const { componentName } = AppBaseConfig;

const AppBase: React.FC<Props> = ({ screenName, title, description, children }) => {
  const testId = tid(screenName, componentName);

  const renderCardHeader = () => (
    <CardHeader>
      <CardTitle {...testProps(tid(testId, 'CardTitle'))}>
        {title}
      </CardTitle>
      <CardDescription {...testProps(tid(testId, 'CardDescription'))}>
        {description}
      </CardDescription>
    </CardHeader>
  );

  const renderCardFooter = () => (
    <StyledCardFooter>
      <StyledButton>
        <LinkIcon {...testProps(tid(testId, 'LinkIcon'))} />
        <StyledAnchor {...testProps(tid(testId, 'StyledAnchor'))}>
          @shadcn/ui
        </StyledAnchor>
      </StyledButton>
    </StyledCardFooter>
  );

  return (
    <StyledContainer {...testProps(tid(testId, 'StyledContainer'))}>
      <StyledCard {...testProps(tid(testId, 'StyledCard'))}>
        {renderCardHeader()}
        <CardContent>
          {children}
        </CardContent>
        {renderCardFooter()}
      </StyledCard>
    </StyledContainer>
  );
};

export default AppBase;