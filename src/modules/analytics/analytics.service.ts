import { AnalyticsRepository } from "./analytics.repository";

export const AnalyticsService = {
  getDashboardData: async (user: { id: string; role: string }) => {
    const { id, role } = user;

    try {
      if (role === "SUPER_ADMIN" || role === "ADMIN") {
        const stats = await AnalyticsRepository.getGlobalStats();
        const popularCourses = await AnalyticsRepository.getPopularCourses();
        return { stats, popularCourses };
      }

      if (role === "INSTRUCTOR") {
        const stats = await AnalyticsRepository.getInstructorStats(id);
        const myCourses = await AnalyticsRepository.getInstructorCourses(id);
        return { stats, myCourses };
      }

      if (role === "STUDENT") {
        const stats = await AnalyticsRepository.getStudentStats(id);
        const enrolledCourses =
          await AnalyticsRepository.getEnrolledCourses(id);
        return { stats, enrolledCourses };
      }

      throw new Error("Unauthorized role access");
    } catch (error: any) {
      throw new Error(`Service Error: ${error.message}`);
    }
  },
};
