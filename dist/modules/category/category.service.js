"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repository_1 = require("./category.repository");
const category_dto_1 = require("./category.dto");
exports.CategoryService = {
    createCategory: async (payload) => {
        const validatedData = category_dto_1.createCategorySchema.parse({ name: payload });
        return await category_repository_1.CategoryRepository.create(validatedData.name);
    },
    getAllCategories: async () => {
        return await category_repository_1.CategoryRepository.findAll();
    },
};
