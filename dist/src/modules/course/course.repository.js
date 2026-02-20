import { prisma } from "../../lib/prisma";
export const CourseRepository = {
    create: async (instructorId, data) => {
        return await prisma.course.create({
            data: {
                ...data,
                instructorId,
                slug: data.title.toLowerCase().replace(/ /g, "-"),
            },
        });
    },
    findById: async (id) => {
        return await prisma.course.findFirst({
            where: { id, isDeleted: false },
            include: { instructor: true, lessons: true },
        });
    },
    update: async (id, data) => {
        return await prisma.course.update({ where: { id }, data });
    },
    softDelete: async (id) => {
        return await prisma.course.update({
            where: { id },
            data: { isDeleted: true },
        });
    },
    findAll: async (filters) => {
        return await prisma.course.findMany({
            where: { ...filters, isDeleted: false },
            include: {
                category: true,
                instructor: { select: { firstName: true, lastName: true } },
            },
        });
    },
};
