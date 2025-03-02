import { z } from 'zod';

const FormSchema = z.object({
  message: z.string().min(2, 'Message must be at least 2 characters.'),
  delay: z.number().min(1, 'Delay must be at least 1 second.').max(5, 'Delay must be less than or equal 5 seconds.')
});

const config = {
  screenName: 'ExampleLoadingOverlay',
  delay: 3, // in seconds
  FormSchema
};

export default config;
