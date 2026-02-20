import express from "express";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
import { EnrollmentController } from "./enrollment.controller";

const router = express.Router();

router.post(
  "/enroll",
  protect,
  restrictTo("STUDENT"),
  EnrollmentController.enroll,
);
router.patch(
  "/progress/:courseId",
  protect,
  restrictTo("STUDENT"),
  EnrollmentController.updateProgress,
);

export const EnrollmentRoutes = router;
