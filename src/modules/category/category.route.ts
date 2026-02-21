import express from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "./category.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

router.post("/cat", protect, restrictTo("SUPER_ADMIN", "ADMIN"), (req, res) =>
  categoryController.create(req, res),
);

router.get("/cat", (req, res) => categoryController.getAll(req, res));

export const CategoryRoutes = router;
