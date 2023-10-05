import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewCategory, UpdateCategory } from '../graphql';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(GraphqlAuthGuard)
  @Query('categories')
  async categories() {
    return this.categoryService.findAllCategories();
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createCategory')
  async createCategory(@Args('input') dto: NewCategory) {
    return this.categoryService.createCategory(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateCategory')
  async updateCategory(@Args('input') dto: UpdateCategory) {
    return this.categoryService.updateCategory(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('deleteCategory')
  async deleteCategory(@Args('id') args: string) {
    return this.categoryService.deleteCategory(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('category')
  async category(@Args('id') args: string) {
    return this.categoryService.findOneCategory(args);
  }
}
