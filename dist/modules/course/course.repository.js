"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.CourseRepository = {
    create: async (instructorId, data) => {
        return await prisma_1.prisma.course.create({
            data: {
                ...data,
                instructorId,
                slug: data.title.toLowerCase().replace(/ /g, "-"),
            },
        });
    },
    findById: async (id) => {
        return await prisma_1.prisma.course.findFirst({
            where: { id, isDeleted: false },
            include: { instructor: true, lessons: true },
        });
    },
    update: async (id, data) => {
        return await prisma_1.prisma.course.update({ where: { id }, data });
    },
    softDelete: async (id) => {
        return await prisma_1.prisma.course.update({
            where: { id },
            data: { isDeleted: true },
        });
    },
    findAll: async (filters) => {
        return await prisma_1.prisma.course.findMany({
            where: { ...filters, isDeleted: false },
            include: {
                category: true,
                instructor: { select: { firstName: true, lastName: true } },
            },
        });
    },
};
