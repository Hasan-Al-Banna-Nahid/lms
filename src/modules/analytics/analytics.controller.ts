import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

export const AnalyticsController = {
  getDashboardData: async (req: Request, res: Response) => {
    try {
      // Ensure req.user exists from your auth middleware
      const user = (req as any).user;

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not authenticated" });
      }

      // Calling the service function
      const result = await AnalyticsService.getDashboardData({
        id: user.id,
        role: user.role,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      console.error("Dashboard Error:", err);
      res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
  },
};
