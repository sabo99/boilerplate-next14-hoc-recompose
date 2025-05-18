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
  isOpen = defaultProps.isOpen,
  title = defaultProps.title,
  message = defaultProps.message,
  withoutFooter,
  confirmButton,
  cancelButton
}) => {
  const testId = tid(screenName, componentName);
  const withFooter = Boolean(withoutFooter) === false;

  const handleConfirm = () => {
    confirmButton?.onClick();
  };

  const handleCancel = () => {
    cancelButton?.onClick();
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
        {cancelButton?.text ?? defaultProps.cancelText}
      </AlertDialogCancel>
      <AlertDialogAction
        {...testProps(tid(testId, 'AlertDialogAction'))}
        onClick={handleConfirm}
      >
        {confirmButton?.text ?? defaultProps.confirmText}
      </AlertDialogAction>
    </AlertDialogFooter>
  );

  const renderAlertDialogContent = () => (
    <AlertDialogContent>
      {renderAlertDialogHeader()}
      {withFooter && renderAlertDialogFooter()}
    </AlertDialogContent>
  );

  return (
    <AlertDialog
      {...testProps(tid(testId, 'AlertDialog'))}
      open={isOpen}
    >
      {renderAlertDialogContent()}
    </AlertDialog>
  );
};

export default AppAlertDialog;
