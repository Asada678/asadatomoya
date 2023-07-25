import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  regUser: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
