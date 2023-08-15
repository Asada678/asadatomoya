import { z } from "zod";

export const ArticleSchema = z.object({
  slug: z.string().refine((value) => value.length >= 1 && value.length <= 30, {
    message: "slugは1文字以上30文字以下で入力してください",
  }),
  image: z.string().optional(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

export type ArticleType = z.infer<typeof ArticleSchema>;
