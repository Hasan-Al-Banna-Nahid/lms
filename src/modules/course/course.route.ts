import express from "express";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CourseRepository } from "./course.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService);

router.get("/", (req, res) => courseController.getAll(req, res));
router.get("/:id", (req, res) => courseController.getById(req, res));
router.post("/", protect, restrictTo("INSTRUCTOR"), (req, res) =>
  courseController.create(req, res),
);
router.delete(
  "/:id",
  protect,
  restrictTo("INSTRUCTOR", "ADMIN", "SUPER_ADMIN"),
  (req, res) => courseController.remove(req, res),
);

export const CourseRoutes = router;
