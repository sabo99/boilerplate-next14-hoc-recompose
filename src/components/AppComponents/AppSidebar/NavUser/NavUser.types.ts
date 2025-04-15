import { Props as withAuthProps } from '@/composers/withAuth/withAuth.types';

export type Props = {
  screenName: string;
  isMobile: boolean;
} & withAuthProps
