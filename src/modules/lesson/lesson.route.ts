import express from "express";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { LessonRepository } from "./lesson.repository";
import { CourseRepository } from "../course/course.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const lessonRepo = new LessonRepository();
const courseRepo = new CourseRepository();
const lessonService = new LessonService(lessonRepo, courseRepo);
const lessonController = new LessonController(lessonService);

router.post("/", protect, restrictTo("INSTRUCTOR"), (req, res) =>
  lessonController.create(req, res),
);
router.get("/course/:courseId", (req, res) =>
  lessonController.getByCourse(req, res),
);

export const LessonRoutes = router;
