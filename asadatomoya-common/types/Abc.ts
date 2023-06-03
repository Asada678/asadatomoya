import { z } from 'zod';

export const AbcSchema = z.object({
  
});

export type Abc = z.infer<typeof AbcSchema>;