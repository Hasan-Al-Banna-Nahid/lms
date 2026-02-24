import { prisma } from "../../lib/prisma";
import { UserStatus, UserRole } from "../../../generated/prisma/client";

export class UserRepository {
  public async createUser(data: any) {
    return await prisma.user.create({ data });
  }

  public async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
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

  public async updateUser(
    id: string,
    data: { status?: UserStatus; role?: UserRole },
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  public async softDeleteUser(id: string) {
    return await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
