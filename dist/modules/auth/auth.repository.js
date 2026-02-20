"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.AuthRepository = {
    findUserByEmail: async (email) => {
        return await prisma_1.prisma.user.findUnique({ where: { email } });
    },
    createUser: async (data) => {
        return await prisma_1.prisma.user.create({ data });
    },
};
