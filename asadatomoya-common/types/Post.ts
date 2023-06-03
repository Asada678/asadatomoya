import { z } from "zod";

export const PostSchema = z.object({
  post_id: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
