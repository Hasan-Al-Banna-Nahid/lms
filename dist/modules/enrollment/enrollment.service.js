"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const enrollment_repository_1 = require("./enrollment.repository");
exports.EnrollmentService = {
    enrollInCourse: async (studentId, courseId) => {
        const isEnrolled = await enrollment_repository_1.EnrollmentRepository.findEnrollment(studentId, courseId);
        if (isEnrolled) {
            throw new Error("You are already enrolled in this course");
        }
        return await enrollment_repository_1.EnrollmentRepository.enroll(studentId, courseId);
    },
    updateLessonProgress: async (studentId, courseId, lessonId, isCompleted) => {
        await enrollment_repository_1.EnrollmentRepository.updateProgress(studentId, lessonId, isCompleted);
        const stats = await enrollment_repository_1.EnrollmentRepository.calculateProgress(studentId, courseId);
        const status = stats.percentage === 100 ? "COMPLETED" : "ACTIVE";
        return await enrollment_repository_1.EnrollmentRepository.updateEnrollmentStats(studentId, courseId, stats.percentage, status);
    },
};
