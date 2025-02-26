import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { AppBase } from "@/components/AppComponents/AppBase";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  TableBody,
  TableCaption,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { mergeTestIds, testProps } from "@/lib/utils";

import { DELAY, FormSchema, screenName } from "./ExampleLoadingOverlay.config";
import { StyledContainer, StyledForm, StyledTable, StyledTableCell, StyledTableHead } from "./ExampleLoadingOverlay.styles";
import { Props } from "./ExampleLoadingOverlay.types";

const ExampleLoadingOverlay: React.FC<Props> = (props) => {
  const { onHandleSubmit, messages, setMessages, progress, setProgress } = props;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: ""
    }
  });

  const onBefore = () => {
    setProgress(25);
  };

  const onAfter = (data: z.infer<typeof FormSchema>) => {
    setMessages((prevMessages) => [...prevMessages, data.message]);
    setProgress(100);
    form.reset(form.formState.defaultValues);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const values = { message: 'Open console.log to check sequential process', delay: DELAY };
    const callbacks = { onBefore, onAfter: () => onAfter(data) };
    onHandleSubmit(values, callbacks);
  };

  const renderForm = () => (
    <Form {...form}>
      <StyledForm
        {...testProps(mergeTestIds(screenName, 'StyledForm'))}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel {...testProps(mergeTestIds(screenName, 'FormLabel'))}>
                Message
              </FormLabel>
              <FormControl>
                <Input
                  {...testProps(mergeTestIds(screenName, 'Input'))}
                  placeholder="Input your message" {...field} />
              </FormControl>
              <FormDescription {...testProps(mergeTestIds(screenName, 'FormDescription'))}>
                This is your public message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button {...testProps(mergeTestIds(screenName, 'SubmitButton'))} type="submit">
          Submit
        </Button>
      </StyledForm>
    </Form>
  );

  const renderTable = () => (
    <StyledTable {...testProps(mergeTestIds(screenName, 'StyledTable'))}>
      <TableCaption {...testProps(mergeTestIds(screenName, 'TableCaption'))}>
        A list of your recent messages.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <StyledTableHead {...testProps(mergeTestIds(screenName, 'StyledTableHead'))}>
            List Message
          </StyledTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {progress > 0 && progress < 100 ? (
          <Progress {...testProps(mergeTestIds(screenName, 'Progress'))} value={progress} />
        ) : (
          messages.map((message, index) => (
            <TableRow key={index}>
              <StyledTableCell {...testProps(mergeTestIds(screenName, 'StyledTableCell', index.toString()))}>
                {message}
              </StyledTableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </StyledTable>
  );

  return (
    <AppBase
      screenName={screenName}
      title="Example withLoadingOverlayPage"
      description="using react-hook-form"
    >
      <StyledContainer {...testProps(mergeTestIds(screenName, 'StyledContainer'))}>
        {renderForm()}
        {renderTable()}
      </StyledContainer>

    </AppBase>
  );
};

export default ExampleLoadingOverlay;
