"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
exports.AnalyticsController = {
    getDashboardData: async (req, res) => {
        try {
            const result = await analytics_service_1.AnalyticsService.getSuperAdminDashboard();
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
};
