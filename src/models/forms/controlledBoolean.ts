import { z } from 'zod';

export const zodOfBoolean = z.enum(['Yes', 'No'], {
  errorMap: (issue, ctx) => ({ message: 'you must select value' }),
});
