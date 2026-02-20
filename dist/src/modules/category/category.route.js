import express from "express";
import { CategoryController } from "./category.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
const router = express.Router();
router.post("/cat", protect, restrictTo("SUPER_ADMIN", "ADMIN"), CategoryController.create);
router.get("/cat", CategoryController.getAll);
export const CategoryRoutes = router;
