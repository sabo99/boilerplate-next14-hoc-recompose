import { z } from 'zod';

const loginSchema = z.object({
  username: z.string()
    .min(5, 'Username must be at least 5 characters.'),
  password: z.string()
    .min(5, 'Password must be at least 5 characters.')
});
const loginFormDefaultValue = {
  username: '',
  password: ''
};

const refetchSchema = z.object({
  limit: z.union([z.string(), z.number()])
    .transform((val) => Number(val))
    .pipe(z.number().min(1, 'Limit must be at least 1.'))
});
const refetchFormDefaultValue = {
  limit: 0
};

const config = {
  screenName: 'ExampleDataFetching',
  loginSchema,
  loginFormDefaultValue,
  refetchSchema,
  refetchFormDefaultValue
};

export default config;
