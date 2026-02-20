import express from "express";
import { AnalyticsController } from "./analytics.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
const router = express.Router();
router.get("/dashboard", protect, restrictTo("SUPER_ADMIN", "ADMIN"), AnalyticsController.getDashboardData);
export const AnalyticsRoutes = router;
