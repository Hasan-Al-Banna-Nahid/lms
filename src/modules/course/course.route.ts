import express from "express";
import { CourseController } from "./course.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getById);
router.post("/", protect, restrictTo("INSTRUCTOR"), CourseController.create);
router.delete(
  "/:id",
  protect,
  restrictTo("INSTRUCTOR", "ADMIN", "SUPER_ADMIN"),
  CourseController.remove,
);

export const CourseRoutes = router;
