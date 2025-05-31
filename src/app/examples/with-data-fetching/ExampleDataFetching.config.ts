import { z } from 'zod';

const refetchSchema = z.object({
  limit: z.union([z.string(), z.number()])
    .transform((val) => Number(val))
    .pipe(z.number().min(1, 'Limit must be at least 1.'))
});
const refetchFormDefaultValue = {
  limit: 0
};

const config = {
  refetchSchema,
  refetchFormDefaultValue
};

export default config;
