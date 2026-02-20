"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.LessonRepository = {
    create: async (data) => {
        return await prisma_1.prisma.lesson.create({ data });
    },
    findByCourseId: async (courseId) => {
        return await prisma_1.prisma.lesson.findMany({
            where: { courseId },
            orderBy: { order: "asc" },
        });
    },
    update: async (id, data) => {
        return await prisma_1.prisma.lesson.update({ where: { id }, data });
    },
    delete: async (id) => {
        return await prisma_1.prisma.lesson.delete({ where: { id } });
    },
};
