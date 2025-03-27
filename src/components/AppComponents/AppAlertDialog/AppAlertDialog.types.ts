export type Props = {
  screenName: string;
} & Options

export type Callbacks = {
  onConfirm?: () => void;
  onCancel?: () => void;
  setIdleOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

export type Options = {
  open?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
} & Callbacks

