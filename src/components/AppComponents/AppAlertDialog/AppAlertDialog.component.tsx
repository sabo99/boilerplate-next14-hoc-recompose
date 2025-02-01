import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { mergeTestIds, testProps } from "@/lib/utils";

import config from "./AppAlertDialog.config";
import type { Props } from "./AppAlertDialog.type";

const { COMPONENT_NAME, defaultProps } = config;

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
        {...testProps(mergeTestIds(screenName, COMPONENT_NAME, 'Title'))}
      >
        {title}
      </AlertDialogTitle>
      <AlertDialogDescription
        {...testProps(mergeTestIds(screenName, COMPONENT_NAME, 'Description'))}
      >
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
  );

  const renderAlertDialogFooter = () => (
    <AlertDialogFooter>
      <AlertDialogCancel
        {...testProps(mergeTestIds(screenName, COMPONENT_NAME, 'Cancel'))}
        onClick={onCancel}
      >
        {cancelText}
      </AlertDialogCancel>
      <AlertDialogAction
        {...testProps(mergeTestIds(screenName, COMPONENT_NAME, 'Action'))}
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
