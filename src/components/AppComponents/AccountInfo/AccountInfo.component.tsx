import AppUserAvatar from '@/components/AppComponents/AppUserAvatar';
import { testProps, tid } from '@/lib/utils';

import { StyledContainer, StyledUserEmail, StyledUserName } from './AccountInfo.styles';
import type { Props } from './AccountInfo.types';

const AccountInfo: React.FC<Props> = (props) => {
  const { screenName, user, icon: renderIcon } = props;
  return (
    <>
      <AppUserAvatar {...props} />
      <StyledContainer>
        <StyledUserName {...testProps(tid(screenName, 'StyledUserName'))}>
          {user.name}
        </StyledUserName>
        <StyledUserEmail {...testProps(tid(screenName, 'StyledUserEmail'))}>
          {user.email}
        </StyledUserEmail>
      </StyledContainer>

      {renderIcon}
    </>
  );
};

export default AccountInfo;