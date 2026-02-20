import { prisma } from "../../lib/prisma";
export const EnrollmentRepository = {
    findEnrollment: async (studentId, courseId) => {
        return await prisma.enrollment.findUnique({
            where: {
                studentId_courseId: { studentId, courseId },
            },
        });
    },
    enroll: async (studentId, courseId) => {
        return await prisma.$transaction(async (tx) => {
            const enrollment = await tx.enrollment.create({
                data: { studentId, courseId },
            });
            const lessons = await tx.lesson.findMany({
                where: { courseId },
            });
            if (lessons.length > 0) {
                await tx.userLessonProgress.createMany({
                    data: lessons.map((lesson) => ({
                        studentId,
                        lessonId: lesson.id,
                        isCompleted: false,
                    })),
                });
            }
            return enrollment;
        });
    },
    updateProgress: async (studentId, lessonId, isCompleted) => {
        return await prisma.lessonProgress.update({
            where: {
                studentId_lessonId: { studentId, lessonId },
            },
            data: { isCompleted },
        });
    },
    calculateProgress: async (studentId, courseId) => {
        const totalLessons = await prisma.lesson.count({ where: { courseId } });
        const lessonsInCourse = await prisma.lesson.findMany({
            where: { courseId },
            select: { id: true },
        });
        const lessonIds = lessonsInCourse.map((l) => l.id);
        const completedLessons = await prisma.lessonProgress.count({
            where: {
                studentId,
                lessonId: { in: lessonIds },
                isCompleted: true,
            },
        });
        return {
            total: totalLessons,
            completed: completedLessons,
            percentage: totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0,
        };
    },
    updateEnrollmentStats: async (studentId, courseId, progress, status) => {
        return await prisma.enrollment.update({
            where: {
                studentId_courseId: { studentId, courseId },
            },
            data: { progress, status: status },
        });
    },
};
