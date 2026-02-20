import { prisma } from "../../lib/prisma";
export const UserRepository = {
    createUser: async (data) => {
        return await prisma.user.create({ data });
    },
    getAllUsers: async (filters) => {
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
    updateUserStatus: async (id, status) => {
        return await prisma.user.update({
            where: { id },
            data: { status: status },
        });
    },
    softDeleteUser: async (id) => {
        return await prisma.user.update({
            where: { id },
            data: { isDeleted: true },
        });
    },
};
