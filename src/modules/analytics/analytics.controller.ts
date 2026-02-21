import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

export const AnalyticsController = {
  getDashboardData: async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      const result = await AnalyticsService.getDashboardData(user);

      res.status(200).json({
        success: true,
        role: user.role,
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
