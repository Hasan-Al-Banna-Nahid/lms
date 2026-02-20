"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
exports.AnalyticsRepository = {
    getGlobalStats: async () => {
        const totalUsers = await prisma_1.prisma.user.count();
        const totalCourses = await prisma_1.prisma.course.count({
            where: { isDeleted: false },
        });
        const totalEnrollments = await prisma_1.prisma.enrollment.count();
        const revenueResult = await prisma_1.prisma.course.aggregate({
            _sum: {
                price: true,
            },
            where: {
                enrollments: { some: {} },
                isPaid: true,
            },
        });
        return {
            totalUsers,
            totalCourses,
            totalEnrollments,
            totalRevenue: revenueResult._sum.price || 0,
        };
    },
    getPopularCourses: async () => {
        return await prisma_1.prisma.course.findMany({
            take: 5,
            where: { isDeleted: false },
            include: {
                _count: {
                    select: { enrollments: true },
                },
            },
            orderBy: {
                enrollments: { _count: "desc" },
            },
        });
    },
};
