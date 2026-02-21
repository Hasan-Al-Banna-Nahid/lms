import { prisma } from "../../lib/prisma";

export class LessonRepository {
  public async create(data: any) {
    return await prisma.lesson.create({ data });
  }

  public async findByCourseId(courseId: string) {
    return await prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: "asc" },
    });
  }

  public async update(id: string, data: any) {
    return await prisma.lesson.update({ where: { id }, data });
  }

  public async delete(id: string) {
    return await prisma.lesson.delete({ where: { id } });
  }
}
