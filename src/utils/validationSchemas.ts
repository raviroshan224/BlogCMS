// --- File: /src/utils/validationSchemas.ts ---
import { z } from 'zod';

export const authorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  avatar: z.string().url('Must be a valid URL'),
});
