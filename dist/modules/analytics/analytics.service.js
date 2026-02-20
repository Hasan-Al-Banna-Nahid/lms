"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const analytics_repository_1 = require("./analytics.repository");
exports.AnalyticsService = {
    getSuperAdminDashboard: async () => {
        const stats = await analytics_repository_1.AnalyticsRepository.getGlobalStats();
        const popularCourses = await analytics_repository_1.AnalyticsRepository.getPopularCourses();
        return {
            stats,
            popularCourses,
        };
    },
};
