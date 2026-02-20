import { AnalyticsService } from "./analytics.service";
export const AnalyticsController = {
    getDashboardData: async (req, res) => {
        try {
            const result = await AnalyticsService.getSuperAdminDashboard();
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
};
