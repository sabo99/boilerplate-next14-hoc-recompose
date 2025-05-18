import Constants from '@/constants';
import { useIdleTimer, useRouter } from '@/hooks';

import type { Props } from './AppIdleSession.types';
import IdlePopup from './IdlePopup';

const { Paths } = Constants;

const AppIdleSession: React.FC<Props> = (props) => {
  const {
    idleTimeout, popupTimeout,
    isIdlePopupOverlay: isOpen, setIdlePopupOverlay: setIsOpen
  } = props;
  const router = useRouter();

  /**
   * Handle when onIdlePopup
   */
  const handleOnIdlePopup = () => {
    setIsOpen(true);
    activePopupTimer();
    pause();
  };

  /**
   * Handle when Click Close Button IdlePopup
   */
  const handleCloseIdlePopup = () => {
    setIsOpen(false);
    activate();
    pausePopupTimer();
  };

  /**
   * Handle when PoupTimer is timeout
   * - redirect to Root Page ('/')
   */
  const handlePopupTimer = () => {
    router.replace(Paths.Root);
  };

  const {
    pause,
    activate
  } = useIdleTimer({
    timeout: idleTimeout,
    onIdle: handleOnIdlePopup
  });

  const {
    pause: pausePopupTimer,
    activate: activePopupTimer
  } = useIdleTimer({
    startManually: true,
    events: [],
    timeout: popupTimeout,
    onIdle: handlePopupTimer
  });

  return (
    <IdlePopup
      {...props}
      isOpen={isOpen}
      onClose={handleCloseIdlePopup}
    />
  );
};

export default AppIdleSession;