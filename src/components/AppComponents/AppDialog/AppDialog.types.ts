import React from 'react';

export type Props = {
  screenName: string;
  isOpen: boolean;
  cancelableOutside?: boolean;
  onAfterClose?: () => void;
} & AppDialogOption;

export type AppDialogButton = {
  type: 'submit' | 'button' | 'reset';
  label: string;
  withCloseDialog?: boolean;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
  onClick?: () => void;
}

export type AppDialogOption = {
  title?: string | null;
  subtitle?: string | null;
  renderContent?: () => React.ReactNode;
  withoutFooter?: boolean;
  buttons?: AppDialogButton[];
}
