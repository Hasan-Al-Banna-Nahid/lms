import { prisma } from "../../lib/prisma";

export const AuthRepository = {
  findUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },
  createUser: async (data: any) => {
    return await prisma.user.create({ data });
  },
};
