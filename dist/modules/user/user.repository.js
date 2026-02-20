"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.UserRepository = {
    createUser: async (data) => {
        return await prisma_1.prisma.user.create({ data });
    },
    getAllUsers: async (filters) => {
        return await prisma_1.prisma.user.findMany({
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
        return await prisma_1.prisma.user.update({
            where: { id },
            data: { status: status },
        });
    },
    softDeleteUser: async (id) => {
        return await prisma_1.prisma.user.update({
            where: { id },
            data: { isDeleted: true },
        });
    },
};
