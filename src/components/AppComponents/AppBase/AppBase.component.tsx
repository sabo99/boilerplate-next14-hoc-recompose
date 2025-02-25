import { LinkIcon } from "lucide-react";
import React from "react";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testProps } from "@/lib/utils";

import config from "./AppBase.config";
import { StyledAnchor, StyledButton, StyledCard, StyledCardFooter, StyledContainer } from "./AppBase.styles";
import { Props } from "./AppBase.types";

const { screenName } = config;

const AppBase: React.FC<Props> = ({ title, description, children }) => {

  const renderCardHeader = () => (
    <CardHeader>
      <CardTitle {...testProps(`${screenName}_CardTitle`)}>
        {title}
      </CardTitle>
      <CardDescription {...testProps(`${screenName}_CardDescription`)}>
        {description}
      </CardDescription>
    </CardHeader>
  );

  const renderCardFooter = () => (
    <StyledCardFooter>
      <StyledButton>
        <LinkIcon {...testProps(`${screenName}_LinkIcon`)} />
        <StyledAnchor {...testProps(`${screenName}_StyledAnchor`)}>
          @shadcn/ui
        </StyledAnchor>
      </StyledButton>
    </StyledCardFooter>
  );

  return (
    <StyledContainer {...testProps(`${screenName}_StyledContainer`)}>
      <StyledCard {...testProps(`${screenName}_StyledCard`)}>
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