import { AnalyticsRepository } from "./analytics.repository";

export const AnalyticsService = {
  getSuperAdminDashboard: async () => {
    const stats = await AnalyticsRepository.getGlobalStats();
    const popularCourses = await AnalyticsRepository.getPopularCourses();

    return {
      stats,
      popularCourses,
    };
  },
};
