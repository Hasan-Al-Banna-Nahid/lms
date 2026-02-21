import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.categoryService.createCategory(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.categoryService.getAllCategories();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
