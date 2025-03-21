import { LucideIcon } from 'lucide-react';

export type SubItem = {
  title: string
  url: string,
  icon?: LucideIcon
  permission?: string
};

export type Item = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  subItems?: SubItem[]
}

export type Props = {
  screenName: string;
  items: Item[],
}