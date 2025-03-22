import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import {
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import {
  StyledBreadcrumbItem,
  StyledBreadcrumbSeparator,
  StyledHeader, StyledHeaderContent,
  StyledSeparator
} from './AppSidebarInset.styles';
import type { Props } from './AppSidebarInset.types';

const AppSidebarInset: React.FC<Props> = ({ screenName, pageTitle, children }) => {

  const renderBreadcrumb = () => (
    <Breadcrumb>
      <BreadcrumbList>
        <StyledBreadcrumbItem>
          <BreadcrumbLink href="/">
            Boilerplate Next14 HOCs Recompose
          </BreadcrumbLink>
        </StyledBreadcrumbItem>
        <StyledBreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage {...testProps(tid(screenName, 'PageTitle'))}>{pageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <SidebarInset {...testProps(tid(screenName, 'SidebarInset'))}>
      <StyledHeader {...testProps(tid(screenName, 'StyledHeader'))}>
        <StyledHeaderContent {...testProps(tid(screenName, 'StyledHeaderContent'))}>
          <SidebarTrigger {...testProps(tid(screenName, 'SidebarTrigger'))} />
          <StyledSeparator />
          {renderBreadcrumb()}
        </StyledHeaderContent>
      </StyledHeader>

      {/* Render Children HERE */}
      {children}
      {/* Render Children HERE */}

    </SidebarInset>
  );
};

export default AppSidebarInset;