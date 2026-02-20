import { CategoryRepository } from "./category.repository";
import { createCategorySchema } from "./category.dto";
export const CategoryService = {
    createCategory: async (payload) => {
        const validatedData = createCategorySchema.parse({ name: payload });
        return await CategoryRepository.create(validatedData.name);
    },
    getAllCategories: async () => {
        return await CategoryRepository.findAll();
    },
};
