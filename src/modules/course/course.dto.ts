import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().optional(),
    price: z.number().min(0),
    isPaid: z.boolean().default(false),
    categoryId: z.string().uuid(),
    thumbnail: z.string().url().optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  }),
});
