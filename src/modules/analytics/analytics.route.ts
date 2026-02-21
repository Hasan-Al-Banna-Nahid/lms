import express from "express";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsRepository } from "./analytics.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const analyticsRepository = new AnalyticsRepository();
const analyticsService = new AnalyticsService(analyticsRepository);
const analyticsController = new AnalyticsController(analyticsService);

router.get(
  "/dashboard",
  protect,
  restrictTo("SUPER_ADMIN", "ADMIN", "STUDENT", "INSTRUCTOR"),
  (req, res) => analyticsController.getDashboardData(req, res),
);

export const AnalyticsRoutes = router;
