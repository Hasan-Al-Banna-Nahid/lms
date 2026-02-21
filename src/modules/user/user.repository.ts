import { prisma } from "../../lib/prisma";

export class UserRepository {
  public async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  public async getAllUsers(filters: any) {
    return await prisma.user.findMany({
      where: { ...filters, isDeleted: false },
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
    return await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
