import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    /** 标签列表（复数） */
    tags: z.array(z.string()).optional().default([]),
    /** 单个标签（兼容旧格式） */
    tag: z.string().optional(),
    /** 分类列表 */
    category: z.array(z.string()).optional().default([]),
    /** 封面图 URL */
    cover: z.string().optional(),
    /** 置顶权重（越大越靠前） */
    sticky: z.number().optional().default(0),
    /** 短链接标识 */
    abbrlink: z.string().optional(),
    /** 草稿 */
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles };
