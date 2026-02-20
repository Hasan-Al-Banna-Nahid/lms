import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export const CategoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const result = await CategoryService.createCategory(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    res.status(200).json({ success: true, data: result });
  },
};
