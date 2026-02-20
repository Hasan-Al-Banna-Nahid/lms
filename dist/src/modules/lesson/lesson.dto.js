import { z } from "zod";
export const createLessonSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        content: z.string().optional(),
        videoUrl: z.string().url().optional(),
        order: z.number().int().positive(),
        isPreview: z.boolean().default(false),
        courseId: z.string().uuid(),
    }),
});
