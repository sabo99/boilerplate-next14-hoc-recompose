import { z } from "zod";

export const screenName = 'ExampleLoadingOverlay';

export const DELAY = 3000;

export const FormSchema = z.object({
  message: z.string().min(2, "Message must be at least 2 characters.")
});
