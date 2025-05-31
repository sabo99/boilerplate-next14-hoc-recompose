import { ComposedAuthProps, ComposedDefaultPropsOptions } from '@/types';

export type Props = ComposedDefaultPropsOptions & ComposedAuthProps & {
  isMobile: boolean;
}
