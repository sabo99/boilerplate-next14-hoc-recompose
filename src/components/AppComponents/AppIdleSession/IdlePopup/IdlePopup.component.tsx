import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

import AppAlertDialog from '@/components/AppComponents/AppAlertDialog';
import { testProps, tid } from '@/lib/utils';

import { StyledButton, StyledPopupSubtitle, StyledTimerText } from './IdlePopup.styles';
import type { Props } from './IdlePopup.types';

const IdlePopup: React.FC<Props> = (props) => {
  const { screenName, popupTimeout, onClose } = props;

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    const showHours = Number(hours) > 0;
    const isUnsupport = Boolean(days);
    const renderTime = () => (
      <>
        In{' '}
        {showHours && `${zeroPad(hours)}:`}
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </>
    );

    const renderUnsupportTime = () => (
      <>Session timer cannot display durations longer than 23 hours, 59 minutes, and 59 seconds.</>
    );

    return (
      <>
        <StyledPopupSubtitle {...testProps(tid(screenName, 'StyledPopupSubtitle'))}>
          Your session time is almost up and you will be automatically returned to the dashboard page.
        </StyledPopupSubtitle>

        <StyledButton
          text="Continue Session"
          onClick={onClose}
          {...testProps(tid(screenName, 'StyledButton'))}
        />

        <StyledTimerText {...testProps(tid(screenName, 'StyledTimerText'))}>
          {isUnsupport ? renderUnsupportTime() : renderTime()}
        </StyledTimerText>

      </>
    );
  };

  const renderMessage = () => {
    return (
      <Countdown
        date={Date.now() + popupTimeout}
        intervalDelay={0}
        precision={2}
        renderer={renderer}
      />
    );
  };

  return (
    <AppAlertDialog
      {...props}
      title='Session Expiring Soon'
      message={renderMessage()}
      withoutFooter
    />
  );

};

export default IdlePopup;