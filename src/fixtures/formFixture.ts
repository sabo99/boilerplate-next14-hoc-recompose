import { z } from 'zod';

const formSchema = z.object({
  username: z.string()
    .min(5, 'Username must be at least 5 characters.'),
  password: z.string()
    .min(5, 'Password must be at least 5 characters.')
});
const formDefaultValue = {
  username: '',
  password: ''
};

export {
  formDefaultValue,
  formSchema
};
