import { LinkIcon } from "lucide-react";
import React from "react";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mergeTestIds, testProps } from "@/lib/utils";

import { componentName }  from "./AppBase.config";
import { StyledAnchor, StyledButton, StyledCard, StyledCardFooter, StyledContainer } from "./AppBase.styles";
import { Props } from "./AppBase.types";

const AppBase: React.FC<Props> = ({ screenName, title, description, children }) => {
  const testId = mergeTestIds(screenName, componentName);

  const renderCardHeader = () => (
    <CardHeader>
      <CardTitle {...testProps(`${testId}_CardTitle`)}>
        {title}
      </CardTitle>
      <CardDescription {...testProps(`${testId}_CardDescription`)}>
        {description}
      </CardDescription>
    </CardHeader>
  );

  const renderCardFooter = () => (
    <StyledCardFooter>
      <StyledButton>
        <LinkIcon {...testProps(`${testId}_LinkIcon`)} />
        <StyledAnchor {...testProps(`${testId}_StyledAnchor`)}>
          @shadcn/ui
        </StyledAnchor>
      </StyledButton>
    </StyledCardFooter>
  );

  return (
    <StyledContainer {...testProps(`${testId}_StyledContainer`)}>
      <StyledCard {...testProps(`${testId}_StyledCard`)}>
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