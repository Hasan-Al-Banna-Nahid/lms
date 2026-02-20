"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().min(0),
        isPaid: zod_1.z.boolean().default(false),
        categoryId: zod_1.z.string().uuid(),
        thumbnail: zod_1.z.string().url().optional(),
    }),
});
exports.updateCourseSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        status: zod_1.z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    }),
});
