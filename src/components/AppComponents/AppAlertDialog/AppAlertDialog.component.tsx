import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { testProps, tid } from '@/lib/utils';

import config from './AppAlertDialog.config';
import type { Props } from './AppAlertDialog.types';

const { componentName, defaultProps } = config;

const AppAlertDialog: React.FC<Props> = ({
  screenName,
  open = defaultProps.open,
  title = defaultProps.title,
  message = defaultProps.message,
  confirmText = defaultProps.confirmText,
  cancelText = defaultProps.cancelText,
  onConfirm,
  onCancel,
  setIdleOverlay
}) => {
  const testId = tid(screenName, componentName);

  const handleClose = () => {
    setIdleOverlay?.(false);
  };

  const handleConfirm = () => {
    handleClose();
    onConfirm?.();
  };

  const handleCancel = () => {
    handleClose();
    onCancel?.();
  };

  const renderAlertDialogHeader = () => (
    <AlertDialogHeader>
      <AlertDialogTitle
        {...testProps(tid(testId, 'AlertDialogTitle'))}
      >
        {title}
      </AlertDialogTitle>
      <AlertDialogDescription
        {...testProps(tid(testId, 'AlertDialogDescription'))}
      >
        {message}
      </AlertDialogDescription>
    </AlertDialogHeader>
  );

  const renderAlertDialogFooter = () => (
    <AlertDialogFooter>
      <AlertDialogCancel
        {...testProps(tid(testId, 'AlertDialogCancel'))}
        onClick={handleCancel}
      >
        {cancelText}
      </AlertDialogCancel>
      <AlertDialogAction
        {...testProps(tid(testId, 'AlertDialogAction'))}
        onClick={handleConfirm}
      >
        {confirmText}
      </AlertDialogAction>
    </AlertDialogFooter>
  );

  const renderAlertDialogContent = () => (
    <AlertDialogContent>
      {renderAlertDialogHeader()}
      {renderAlertDialogFooter()}
    </AlertDialogContent>
  );

  return (
    <AlertDialog
      {...testProps(tid(testId, 'AlertDialog'))}
      open={open}
    >
      {renderAlertDialogContent()}
    </AlertDialog>
  );
};

export default AppAlertDialog;
