import { EnrollmentRepository } from "./enrollment.repository";

export const EnrollmentService = {
  enrollInCourse: async (studentId: string, courseId: string) => {
    const isEnrolled = await EnrollmentRepository.findEnrollment(
      studentId,
      courseId,
    );
    if (isEnrolled) {
      throw new Error("You are already enrolled in this course");
    }

    return await EnrollmentRepository.enroll(studentId, courseId);
  },

  updateLessonProgress: async (
    studentId: string,
    courseId: string,
    lessonId: string,
    isCompleted: boolean,
  ) => {
    await EnrollmentRepository.updateProgress(studentId, lessonId, isCompleted);

    const stats = await EnrollmentRepository.calculateProgress(
      studentId,
      courseId,
    );
    const status = stats.percentage === 100 ? "COMPLETED" : "ACTIVE";

    return await EnrollmentRepository.updateEnrollmentStats(
      studentId,
      courseId,
      stats.percentage,
      status,
    );
  },
};
