import { prisma } from "../../lib/prisma";
export const LessonRepository = {
    create: async (data) => {
        return await prisma.lesson.create({ data });
    },
    findByCourseId: async (courseId) => {
        return await prisma.lesson.findMany({
            where: { courseId },
            orderBy: { order: "asc" },
        });
    },
    update: async (id, data) => {
        return await prisma.lesson.update({ where: { id }, data });
    },
    delete: async (id) => {
        return await prisma.lesson.delete({ where: { id } });
    },
};
