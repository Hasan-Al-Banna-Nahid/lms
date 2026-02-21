import { AnalyticsRepository } from "./analytics.repository";

interface UserPayload {
  id: string;
  role: string;
}

export class AnalyticsService {
  private repository: AnalyticsRepository;

  constructor(repository: AnalyticsRepository) {
    this.repository = repository;
  }

  public async getDashboardData(user: UserPayload) {
    const { id, role } = user;

    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      const stats = await this.repository.getGlobalStats();
      const popularCourses = await this.repository.getPopularCourses();
      return { stats, popularCourses };
    }

    if (role === "INSTRUCTOR") {
      const stats = await this.repository.getInstructorStats(id);
      const myCourses = await this.repository.getInstructorCourses(id);
      return { stats, myCourses };
    }

    if (role === "STUDENT") {
      const stats = await this.repository.getStudentStats(id);
      const enrolledCourses = await this.repository.getEnrolledCourses(id);
      return { stats, enrolledCourses };
    }

    throw new Error("Unauthorized role access");
  }
}
