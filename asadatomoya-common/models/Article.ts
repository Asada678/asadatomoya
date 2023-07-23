import { z } from "zod";

export const ArticleSchema = z.object({
  image: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

export type ArticleType = z.infer<typeof ArticleSchema>;
