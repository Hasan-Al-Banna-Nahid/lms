import { prisma } from "../../lib/prisma";

export class UserRepository {
  public async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  public async getAllUsers(filters: any) {
    return await prisma.user.findMany({
      // Remove isDeleted if it's not in your schema.prisma
      where: { ...filters },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  public async updateUserStatus(id: string, status: string) {
    return await prisma.user.update({
      where: { id },
      data: { status: status as any },
    });
  }

  public async softDeleteUser(id: string) {
    // If isDeleted doesn't exist, use delete (Hard Delete)
    // or add the field to schema.prisma first
    return await prisma.user.delete({
      where: { id },
    });
  }
}
