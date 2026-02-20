import express from "express";
import { LessonController } from "./lesson.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
const router = express.Router();
router.post("/", protect, restrictTo("INSTRUCTOR"), LessonController.create);
router.get("/course/:courseId", LessonController.getByCourse);
export const LessonRoutes = router;
