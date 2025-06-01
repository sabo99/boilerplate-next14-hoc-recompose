import z from 'zod';

const formSchema = z.object({
  username: z.string(),
  password: z.string()
    .min(5, 'Password must be at least 5 characters.')
});
const formDefaultValue = {
  username: '',
  password: ''
};

const Config = {
  formSchema,
  formDefaultValue
};

export default Config;