import { CategoryService } from "./category.service";
export const CategoryController = {
    create: async (req, res) => {
        try {
            const result = await CategoryService.createCategory(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    getAll: async (req, res) => {
        const result = await CategoryService.getAllCategories();
        res.status(200).json({ success: true, data: result });
    },
};
