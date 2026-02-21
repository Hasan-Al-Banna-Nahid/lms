import { CategoryRepository } from "./category.repository";
import { createCategorySchema } from "./category.dto";

export class CategoryService {
  private repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  public async createCategory(payload: any) {
    const validatedData = createCategorySchema.parse({ name: payload.name });
    return await this.repository.create(validatedData.name);
  }

  public async getAllCategories() {
    return await this.repository.findAll();
  }
}
