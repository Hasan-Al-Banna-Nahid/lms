"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.CategoryRepository = {
    create: async (name) => {
        return await prisma_1.prisma.category.create({ data: { name } });
    },
    findAll: async () => {
        return await prisma_1.prisma.category.findMany({
            include: { _count: { select: { courses: true } } },
        });
    },
    delete: async (id) => {
        return await prisma_1.prisma.category.delete({ where: { id } });
    },
};
