import z from 'zod';

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

const config = {
  loginSchema,
  loginFormDefaultValue
};

export default config;
