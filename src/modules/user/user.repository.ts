import { prisma } from "../../lib/prisma";

export const UserRepository = {
  createUser: async (data: any) => {
    return await prisma.user.create({ data });
  },

  getAllUsers: async (filters: any) => {
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
  },

  updateUserStatus: async (id: string, status: string) => {
    return await prisma.user.update({
      where: { id },
      data: { status: status as any },
    });
  },

  softDeleteUser: async (id: string) => {
    return await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  },
};
