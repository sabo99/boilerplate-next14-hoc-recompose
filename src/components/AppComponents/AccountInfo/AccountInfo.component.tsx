import AppAvatar from '@/components/AppComponents/AppAvatar';
import { getInitials, joinWith, testProps, tid } from '@/lib/utils';

import AccountInfoConfig from './AccountInfo.config';
import { StyledContainer, StyledUserEmail, StyledUserFullName } from './AccountInfo.styles';
import type { Props } from './AccountInfo.types';

const { componentName } = AccountInfoConfig;

const AccountInfo: React.FC<Props> = (props) => {
  const { screenName, user, icon: renderIcon } = props;
  const testId = tid(screenName, componentName);
  const fullName = user ? joinWith([user.firstName, user.lastName], ' ') : 'Guest';
  const initialName = getInitials(fullName);
  const email = user ? user.email : '-';

  return (
    <>
      <AppAvatar
        screenName={screenName}
        src={user?.image}
        alt="User-Image"
        fallback={initialName}
      />
      <StyledContainer>
        <StyledUserFullName {...testProps(tid(testId, 'StyledUserFullName'))}>
          {fullName}
        </StyledUserFullName>
        <StyledUserEmail {...testProps(tid(testId, 'StyledUserEmail'))}>
          {email}
        </StyledUserEmail>
      </StyledContainer>

      {renderIcon}
    </>
  );
};

export default AccountInfo;