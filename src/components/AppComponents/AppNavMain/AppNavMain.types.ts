import { LucideIcon } from 'lucide-react';

type SubItem = {
  title: string
  url: string,
  icon?: LucideIcon
  permission?: string
};

type Item = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  subItems?: SubItem[]
}

export type Props = {
  items: Item[],
}