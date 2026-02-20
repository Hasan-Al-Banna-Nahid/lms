"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLessonSchema = void 0;
const zod_1 = require("zod");
exports.createLessonSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3),
        content: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().url().optional(),
        order: zod_1.z.number().int().positive(),
        isPreview: zod_1.z.boolean().default(false),
        courseId: zod_1.z.string().uuid(),
    }),
});
