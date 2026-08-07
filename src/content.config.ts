import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    /** 标签列表（复数） */
    tags: z.array(z.string()).optional().default([]),
    /** 单个标签（兼容旧格式，string 或 array → string） */
    tag: z.union([z.string(), z.array(z.string())])
      .transform(v => Array.isArray(v) ? v[0] ?? undefined : v)
      .optional(),
    /** 分类列表（兼容 string 或 array → array） */
    category: z.union([z.string(), z.array(z.string())])
      .transform(v => typeof v === "string" ? [v] : v)
      .optional()
      .default([]),
    /** 封面图 URL（兼容 null） */
    cover: z.string().nullable().optional(),
    /** 置顶权重（越大越靠前） */
    sticky: z.number().nullable().optional().default(0),
    /** 短链接标识 */
    abbrlink: z.string().optional(),
    /** 草稿 */
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles };
