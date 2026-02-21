import { prisma } from "../../lib/prisma";

export class AnalyticsRepository {
  public async getGlobalStats() {
    const totalUsers = await prisma.user.count();
    const totalCourses = await prisma.course.count({
      where: { isDeleted: false },
    });
    const totalEnrollments = await prisma.enrollment.count();

    const revenueResult = await prisma.enrollment.aggregate({
      _sum: { amount: true },
    });

    return {
      totalUsers,
      totalCourses,
      totalEnrollments,
      totalRevenue: revenueResult._sum.amount || 0,
    };
  }

  public async getPopularCourses() {
    return await prisma.course.findMany({
      take: 5,
      where: { isDeleted: false, status: "PUBLISHED" },
      include: {
        _count: { select: { enrollments: true } },
        category: true,
      },
      orderBy: { enrollments: { _count: "desc" } },
    });
  }

  public async getInstructorStats(instructorId: string) {
    const totalCourses = await prisma.course.count({
      where: { instructorId, isDeleted: false },
    });

    const totalStudents = await prisma.enrollment.count({
      where: { course: { instructorId } },
    });

    const revenueResult = await prisma.enrollment.aggregate({
      where: { course: { instructorId } },
      _sum: { amount: true },
    });

    return {
      totalCourses,
      totalStudents,
      totalRevenue: revenueResult._sum.amount || 0,
    };
  }

  public async getInstructorCourses(instructorId: string) {
    return await prisma.course.findMany({
      where: { instructorId, isDeleted: false },
      include: {
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  public async getStudentStats(studentId: string) {
    const totalEnrolled = await prisma.enrollment.count({
      where: { studentId },
    });

    const completedCourses = await prisma.enrollment.count({
      where: { studentId, status: "COMPLETED" },
    });

    return {
      totalEnrolled,
      completedCourses,
      activeCourses: totalEnrolled - completedCourses,
    };
  }

  public async getEnrolledCourses(studentId: string) {
    return await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            instructor: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
