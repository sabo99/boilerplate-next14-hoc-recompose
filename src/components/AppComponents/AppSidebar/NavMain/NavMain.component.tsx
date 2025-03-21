import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { testProps, tid } from '@/lib/utils';

import { StyledChevronRightIcon } from './NavMain.styles';
import type { Item, Props, SubItem } from './NavMain.types';

const NavMain: React.FC<Props> = ({ screenName, items }) => {

  const renderSidebarMenuSubItem = (subItem: SubItem) => (
    <SidebarMenuSubItem key={subItem.title}>
      <SidebarMenuSubButton asChild>
        <a href={subItem.url}>
          {subItem.icon && <subItem.icon />}
          <span>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  const renderSidebarMenuSub = (item: Item) => (
    <SidebarMenuSub>
      {item.subItems && item.subItems.map((subItem) => renderSidebarMenuSubItem(subItem))}
    </SidebarMenuSub>
  );

  const renderSidebarMenuItem = (item: Item) => (
    <SidebarMenuItem>

      <CollapsibleTrigger asChild>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          <StyledChevronRightIcon />
        </SidebarMenuButton>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {renderSidebarMenuSub(item)}
      </CollapsibleContent>

    </SidebarMenuItem>
  );

  const renderSidebarMenu = () => (
    <SidebarMenu {...testProps(tid(screenName, 'SidebarMenu'))}>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          {renderSidebarMenuItem(item)}
        </Collapsible>
      ))}
    </SidebarMenu>
  );

  return (
    <SidebarGroup {...testProps(tid(screenName, 'SidebarGroup'))}>
      <SidebarGroupLabel {...testProps(tid(screenName, 'SidebarGroupLabel'))}>
        HOCs with Recompose
      </SidebarGroupLabel>
      {renderSidebarMenu()};
    </SidebarGroup>
  );
};

export default NavMain;
