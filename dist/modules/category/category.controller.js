"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
exports.CategoryController = {
    create: async (req, res) => {
        try {
            const result = await category_service_1.CategoryService.createCategory(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    getAll: async (req, res) => {
        const result = await category_service_1.CategoryService.getAllCategories();
        res.status(200).json({ success: true, data: result });
    },
};
