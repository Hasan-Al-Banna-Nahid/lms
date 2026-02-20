import { prisma } from "../../lib/prisma";

export const LessonRepository = {
  create: async (data: any) => {
    return await prisma.lesson.create({ data });
  },

  findByCourseId: async (courseId: string) => {
    return await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
    });
  },

  update: async (id: string, data: any) => {
    return await prisma.lesson.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    return await prisma.lesson.delete({ where: { id } });
  },
};
