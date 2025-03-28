import { Sidebar } from '@/components/ui/sidebar';

export type Props = React.ComponentProps<typeof Sidebar> & {
  screenName: string, permissions: string[]
}