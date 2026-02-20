import { z } from "zod";
export const enrollCourseSchema = z.object({
    body: z.object({
        courseId: z.string().uuid(),
    }),
});
export const updateProgressSchema = z.object({
    body: z.object({
        lessonId: z.string().uuid(),
        isCompleted: z.boolean(),
    }),
});
