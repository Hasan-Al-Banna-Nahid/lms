import { prisma } from "../../lib/prisma";
export const AuthRepository = {
    findUserByEmail: async (email) => {
        return await prisma.user.findUnique({ where: { email } });
    },
    createUser: async (data) => {
        return await prisma.user.create({ data });
    },
};
