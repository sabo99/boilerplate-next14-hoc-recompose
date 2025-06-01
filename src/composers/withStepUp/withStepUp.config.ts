import z from 'zod';

const stepUpPasswordFormSchema = z.object({
  username: z.string(),
  password: z.string()
    .min(5, 'Password must be at least 5 characters.')
});
const stepUpPasswordFormDefaultValue = {
  username: '',
  password: ''
};

const Config = {
  stepUpPasswordFormSchema,
  stepUpPasswordFormDefaultValue
};

export default Config;