import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials, testProps, tid } from '@/lib/utils';

import type { Props } from './AppUserAvatar.types';

const AppUserAvatar: React.FC<Props> = ({ screenName, user, avatarFallback }) => {
  return (
    <Avatar
      {...testProps(tid(screenName, 'Avatar'))}
      className="h-8 w-8 rounded-lg"
    >
      <AvatarImage
        {...testProps(tid(screenName, 'AvatarImage'))}
        src={user.photo}
        alt={user.name}
      />
      <AvatarFallback
        {...testProps(tid(screenName, 'AvatarFallback'))}
        className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
      >
        {avatarFallback || getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AppUserAvatar;