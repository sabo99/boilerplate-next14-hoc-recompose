export type Props = {
  screenName: string;
  open?: boolean;
  title?: string;
  description?: string;
  actionText?: string;
  cancelText?: string;
  onAction?: () => void;
  onCancel?: () => void;
}