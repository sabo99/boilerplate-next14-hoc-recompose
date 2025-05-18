export type Props = {
  screenName: string;
  isOpen: boolean;
  popupTimeout: number;
  onClose: () => void;
}

export type StyledButtonProps = {
  text: string;
}