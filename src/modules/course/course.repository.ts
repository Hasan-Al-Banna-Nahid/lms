import { prisma } from "../../lib/prisma";

export class CourseRepository {
  public async create(instructorId: string, data: any) {
    return await prisma.course.create({
      data: {
        ...data,
        instructorId,
        slug: data.title.toLowerCase().replace(/ /g, "-"),
      },
    });
  }

  public async findById(id: string) {
    return await prisma.course.findFirst({
      where: { id, isDeleted: false },
      include: { instructor: true, lessons: true },
    });
  }

  public async update(id: string, data: any) {
    return await prisma.course.update({ where: { id }, data });
  }

  public async softDelete(id: string) {
    return await prisma.course.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  public async findAll(filters: any) {
    return await prisma.course.findMany({
      where: { ...filters, isDeleted: false },
      include: {
        category: true,
        instructor: { select: { firstName: true, lastName: true } },
      },
    });
  }
}
