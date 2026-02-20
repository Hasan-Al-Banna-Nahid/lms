import { prisma } from "../../lib/prisma";
export const AnalyticsRepository = {
    getGlobalStats: async () => {
        const totalUsers = await prisma.user.count();
        const totalCourses = await prisma.course.count({
            where: { isDeleted: false },
        });
        const totalEnrollments = await prisma.enrollment.count();
        const revenueResult = await prisma.course.aggregate({
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
        return await prisma.course.findMany({
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
