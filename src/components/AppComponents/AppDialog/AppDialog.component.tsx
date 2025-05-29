import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { testProps, tid } from '@/lib/utils';

import Config from './AppDialog.config';
import type { AppDialogButton, Props } from './AppDialog.types';

const { defaultProps } = Config;

const AppDialog: React.FC<Props> = (props) => {
  const {
    screenName, isOpen, cancelableOutside,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    buttons = defaultProps.buttons,
    withoutFooter,
    renderContent,
    onAfterClose
  } = props;
  const [open, setOpen] = React.useState(isOpen);

  const withContent = renderContent !== undefined;
  const withFooter = !withoutFooter;
  const preventDefault = (event: Event): void => event.preventDefault();
  const withCancelOutside = !cancelableOutside && {
    onInteractOutside: preventDefault,
    onEscapeKeyDown: preventDefault
  };

  const handleDialogClose = () => {
    setOpen(false);
    onAfterClose?.();
  };

  const renderButton = (button: any, index: number) => {
    const { withCloseDialog, label, onClick } = button as AppDialogButton;
    const onClickButton = onClick || handleDialogClose;
    if (withCloseDialog) {
      return (
        <DialogClose
          key={index}
          asChild
          {...testProps(tid(screenName, 'DialogClose'))}
        >
          <Button
            type='button'
            onClick={onClickButton}
            {...button}
            {...testProps(tid(screenName, 'DialogButton'))}
          >
            {label}
          </Button>
        </DialogClose>
      );
    } else {
      return (
        <Button
          key={index}
          onClick={onClickButton}
          {...button}
          {...testProps(tid(screenName, 'DialogButton'))}
        >
          {label}
        </Button>
      );
    }
  };

  const renderDialogFooter = () => (
    <DialogFooter {...testProps(tid(screenName, 'DialogFooter'))}>
      {buttons && buttons.map(renderButton)}
    </DialogFooter>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogClose}
      {...testProps(tid(screenName, 'Dialog'))}
    >
      <DialogContent
        {...withCancelOutside}
        {...testProps(tid(screenName, 'DialogContent'))}
      >
        <DialogHeader {...testProps(tid(screenName, 'DialogHeader'))}>
          <DialogTitle {...testProps(tid(screenName, 'DialogTitle'))}>
            {title}
          </DialogTitle>
          <DialogDescription {...testProps(tid(screenName, 'DialogDescription'))}>
            {subtitle}
          </DialogDescription>
        </DialogHeader>

        {withContent && renderContent()}

        {withFooter && renderDialogFooter()}

      </DialogContent>
    </Dialog >
  );
};

export default AppDialog;