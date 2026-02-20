import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

export const AnalyticsController = {
  getDashboardData: async (req: Request, res: Response) => {
    try {
      const result = await AnalyticsService.getSuperAdminDashboard();
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
