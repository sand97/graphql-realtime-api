import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewCategory, UpdateCategory } from '../graphql';
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query('categories')
  async categories() {
    return this.categoryService.findAllCategories();
  }

  @Mutation('createCategory')
  async createCategory(@Args('input') dto: NewCategory) {
    return this.categoryService.createCategory(dto);
  }

  @Mutation('updateCategory')
  async updateCategory(@Args('input') dto: UpdateCategory) {
    return this.categoryService.updateCategory(dto);
  }
  @Mutation('deleteCategory')
  async deleteCategory(@Args('id') args: string) {
    return this.categoryService.deleteCategory(args);
  }
  @Query('category')
  async category(@Args('id') args: string) {
    return this.categoryService.findOneCategory(args);
  }
}
