import express from "express";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
import { EnrollmentController } from "./enrollment.controller";
import { EnrollmentService } from "./enrollment.service";
import { EnrollmentRepository } from "./enrollment.repository";

const router = express.Router();

const enrollmentRepo = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepo);
const enrollmentController = new EnrollmentController(enrollmentService);

router.post("/enroll", protect, restrictTo("STUDENT"), (req, res) =>
  enrollmentController.enroll(req, res),
);

router.patch(
  "/progress/:courseId",
  protect,
  restrictTo("STUDENT"),
  (req, res) => enrollmentController.updateProgress(req, res),
);

export const EnrollmentRoutes = router;
