import { prisma } from "../../lib/prisma";

export class CategoryRepository {
  public async create(name: string) {
    return await prisma.category.create({
      data: { name },
    });
  }

  public async findAll() {
    return await prisma.category.findMany({
      include: {
        _count: { select: { courses: true } },
      },
    });
  }

  public async delete(id: string) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}
