import { prisma } from "../../lib/prisma";
export const CategoryRepository = {
    create: async (name) => {
        return await prisma.category.create({ data: { name } });
    },
    findAll: async () => {
        return await prisma.category.findMany({
            include: { _count: { select: { courses: true } } },
        });
    },
    delete: async (id) => {
        return await prisma.category.delete({ where: { id } });
    },
};
