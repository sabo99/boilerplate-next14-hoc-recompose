import React from 'react';

import AppBase from '@/components/AppComponents/AppBase';
import { Button } from '@/components/ui/button';
import { useStepUp } from '@/hooks';
import { testProps, tid } from '@/lib/utils';
import type { AppDialogOption, ComposedStepUpTypeOptions } from '@/types';

import ExampleStepUpVerificationConfig from './ExampleStepUpVerification.config';
import type { Props } from './ExampleStepUpVerification.types';

const { buttons } = ExampleStepUpVerificationConfig;

const ExampleStepUpVerification: React.FC<Props> = (props) => {
  const { screenName, pageTitle } = props;
  const [latestStepUpType, seLatestStepUpType] = React.useState<ComposedStepUpTypeOptions | null>(null);
  const { openStepUp } = useStepUp(props);

  const handleOpenStepUp = (type: ComposedStepUpTypeOptions, dialogOption: AppDialogOption) => {
    const appDialogOption = {
      ...dialogOption,
      withoutFooter: true,
      buttons: [
        {
          type: 'submit',
          variant: 'default',
          label: 'Confirm'
        }
      ]
    } satisfies AppDialogOption;
    openStepUp(type, appDialogOption);
    seLatestStepUpType(type);
  };

  return (
    <AppBase
      screenName={screenName}
      title={pageTitle}
      description="Step-Up Verification with Dialog"
    >
      <div className="flex gap-4" {...testProps(tid(screenName, 'ButtonContainer'))}>
        {buttons.map(({ text, stepUpType, appDialogOption }, idx) => (
          <Button
            key={idx}
            onClick={() => handleOpenStepUp(stepUpType as ComposedStepUpTypeOptions, appDialogOption)}
            {...(latestStepUpType === stepUpType && { variant: 'outline' })}
            {...testProps(tid(screenName, stepUpType, 'Button'))}
          >
            {text}
          </Button>
        ))}
      </div>

    </AppBase>
  );
};

export default ExampleStepUpVerification;