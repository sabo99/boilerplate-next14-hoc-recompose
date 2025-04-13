import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testProps, tid } from '@/lib/utils';

import type { Props } from './AppAvatar.types';

const AppAvatar: React.FC<Props> = ({ screenName, fallback, ...props }) => {
  return (
    <Avatar
      {...testProps(tid(screenName, 'Avatar'))}
      className="h-8 w-8 rounded-lg"
    >
      <AvatarImage
        {...testProps(tid(screenName, 'AvatarImage'))}
        {...props}
      />
      <AvatarFallback
        {...testProps(tid(screenName, 'AvatarFallback'))}
        className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;