"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgressSchema = exports.enrollCourseSchema = void 0;
const zod_1 = require("zod");
exports.enrollCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string().uuid(),
    }),
});
exports.updateProgressSchema = zod_1.z.object({
    body: zod_1.z.object({
        lessonId: zod_1.z.string().uuid(),
        isCompleted: zod_1.z.boolean(),
    }),
});
