import { EnrollmentRepository } from "./enrollment.repository";

export class EnrollmentService {
  private repository: EnrollmentRepository;

  constructor(repository: EnrollmentRepository) {
    this.repository = repository;
  }

  public async enrollInCourse(studentId: string, courseId: string) {
    const isEnrolled = await this.repository.findEnrollment(
      studentId,
      courseId,
    );
    if (isEnrolled) {
      throw new Error("You are already enrolled in this course");
    }

    return await this.repository.enroll(studentId, courseId);
  }

  public async updateLessonProgress(
    studentId: string,
    courseId: string,
    lessonId: string,
    isCompleted: boolean,
  ) {
    await this.repository.updateProgress(studentId, lessonId, isCompleted);

    const stats = await this.repository.calculateProgress(studentId, courseId);
    const status = stats.percentage === 100 ? "COMPLETED" : "ACTIVE";

    return await this.repository.updateEnrollmentStats(
      studentId,
      courseId,
      stats.percentage,
      status,
    );
  }
}
