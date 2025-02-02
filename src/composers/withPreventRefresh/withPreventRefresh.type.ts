type AlertDialogOption = {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export type Options = {
  redirectPath: string;
  alertDialogOption?: AlertDialogOption;
}