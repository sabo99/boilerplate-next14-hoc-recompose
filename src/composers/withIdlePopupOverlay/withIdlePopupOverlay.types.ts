export type Options = {
  overlayState: 'IDLE';
}

export type Props = {
  // from defaultProps
  screenName: string;
  popupTimeout: number;
  idleTimeout: number,
  // from (withIdlePopupOverlay state)
  isIdlePopupOverlay: boolean;
  setIdlePopupOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}