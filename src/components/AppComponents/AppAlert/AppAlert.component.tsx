import { AlertDescription, AlertTitle } from '@/components/ui/alert';
import { testProps, tid } from '@/lib/utils';

import { StyledAlert, StyledIcon } from './AppAlert.styles';
import type { Props } from './AppAlert.types';

const AppAlert = (props: Props) => {
  const {
    screenName,
    className,
    variant,
    icon: Icon,
    title,
    message
  } = props;

  return (
    <StyledAlert
      variant={variant}
      className={className}
      {...testProps(tid(screenName, 'StyledAlert'))}
    >
      {Icon &&
        <StyledIcon
          icon={Icon}
          {...testProps(tid(screenName, 'StyledIcon'))}
        />
      }
      <AlertTitle {...testProps(tid(screenName, 'AlertTitle'))}>
        {title}
      </AlertTitle>
      <AlertDescription {...testProps(tid(screenName, 'AlertDescription'))}>
        {message}
      </AlertDescription>
    </StyledAlert>
  );
};

export default AppAlert;