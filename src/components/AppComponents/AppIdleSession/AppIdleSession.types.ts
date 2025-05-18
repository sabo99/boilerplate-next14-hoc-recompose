export type Props = {
  screenName: string;
  idleTimeout: number;
  popupTimeout: number;
  isIdlePopupOverlay: boolean;
  setIdlePopupOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}