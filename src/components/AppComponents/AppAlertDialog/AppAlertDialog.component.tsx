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
import { testProps,tid } from '@/lib/utils';

import config from './AppAlertDialog.config';
import type { Props } from './AppAlertDialog.types';

const { componentName, defaultProps } = config;

const AppAlertDialog: React.FC<Props> = (props) => {
  const {
    screenName,
    open = defaultProps.open,
    title = defaultProps.title,
    description = defaultProps.description,
    actionText = defaultProps.actionText,
    cancelText = defaultProps.cancelText,
    onAction,
    onCancel
  } = props;

  const renderAlertDialogHeader = () => (
    <AlertDialogHeader>
      <AlertDialogTitle
        {...testProps(tid(screenName, componentName, 'Title'))}
      >
        {title}
      </AlertDialogTitle>
      <AlertDialogDescription
        {...testProps(tid(screenName, componentName, 'Description'))}
      >
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
  );

  const renderAlertDialogFooter = () => (
    <AlertDialogFooter>
      <AlertDialogCancel
        {...testProps(tid(screenName, componentName, 'Cancel'))}
        onClick={onCancel}
      >
        {cancelText}
      </AlertDialogCancel>
      <AlertDialogAction
        {...testProps(tid(screenName, componentName, 'Action'))}
        onClick={onAction}
      >
        {actionText}
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
      open={open}
    >
      {renderAlertDialogContent()}
    </AlertDialog>
  );
};

export default AppAlertDialog;
