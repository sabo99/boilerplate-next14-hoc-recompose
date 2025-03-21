import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import AppBase from '@/components/AppComponents/AppBase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { testProps, tid } from '@/lib/utils';

import ExampleLoadingOverlayConfig from './ExampleLoadingOverlay.config';
import {
  StyledContainer,
  StyledForm,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead
} from './ExampleLoadingOverlay.styles';
import type { Props } from './ExampleLoadingOverlay.types';

const { FormSchema } = ExampleLoadingOverlayConfig;

const ExampleLoadingOverlay: React.FC<Props> = ({
  screenName,
  messages, setMessages, progress, setProgress,
  onHandleSubmit
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
      delay: 0
    }
  });

  React.useEffect(() => {
    if (progress >= 100) return;

    const totalProgress = 100;
    const currentDelay = form.getValues('delay');
    const increment = totalProgress / currentDelay;

    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + increment, totalProgress));
    }, 1000);

    return () => clearInterval(interval);
  }, [form, progress, setProgress]);

  const onBefore = () => {
    setProgress(5);
  };

  const onAfter = (data: z.infer<typeof FormSchema>) => {
    setMessages((prevMessages) => [...prevMessages, data.message]);
    form.reset(form.formState.defaultValues);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const values = { delay: data.delay };
    const callbacks = { onBefore, onAfter: () => onAfter(data) };
    onHandleSubmit(values, callbacks);
  };

  const renderForm = () => (
    <Form {...form}>
      <StyledForm
        {...testProps(tid(screenName, 'StyledForm'))}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel {...testProps(tid(screenName, 'FormLabel', field.name))}>
                Message
              </FormLabel>
              <FormControl>
                <Input
                  {...testProps(tid(screenName, 'Input', field.name))}
                  {...field}
                  placeholder="Input your message" />
              </FormControl>
              <FormDescription {...testProps(tid(screenName, 'FormDescription', field.name))}>
                This is your public message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delay"
          render={({ field }) => (
            <FormItem>
              <FormLabel {...testProps(tid(screenName, 'FormLabel', field.name))}>
                Delay (in seconds)
              </FormLabel>
              <FormControl>
                <Input
                  {...testProps(tid(screenName, 'Input', field.name))}
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue(field.name, parseInt(e.target.value, 10));
                  }}
                  type='number'
                  placeholder="Input your delay" />
              </FormControl>
              <FormDescription {...testProps(tid(screenName, 'FormDescription', field.name))}>
                This input will delay the process.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button {...testProps(tid(screenName, 'SubmitButton'))} type="submit">
          Submit
        </Button>

      </StyledForm>
    </Form>
  );

  const renderProgress = () => progress > 0 && progress < 100 && (
    <TableRow>
      <TableCell>
        <Progress {...testProps(tid(screenName, 'Progress'))} value={progress} />
      </TableCell>
    </TableRow>
  );

  const renderTable = () => (
    <StyledTableContainer {...testProps(tid(screenName, 'StyledTableContainer'))}>
      <Table>
        <TableCaption {...testProps(tid(screenName, 'TableCaption'))}>
          A list of your recent messages.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <StyledTableHead {...testProps(tid(screenName, 'StyledTableHead'))}>
              List Message
            </StyledTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderProgress()}
          {messages.map((message, index) => (
            <TableRow key={index}>
              <StyledTableCell {...testProps(tid(screenName, 'StyledTableCell', index.toString()))}>
                {message}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );

  return (
    <AppBase
      screenName={screenName}
      title="Example withLoadingOverlayPage"
      description="using react-hook-form"
    >
      <StyledContainer {...testProps(tid(screenName, 'StyledContainer'))}>
        {renderForm()}
        {renderTable()}
      </StyledContainer>

    </AppBase>
  );
};

export default ExampleLoadingOverlay;
