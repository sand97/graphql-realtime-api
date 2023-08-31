import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { NewCategory, UpdateCategory } from '../graphql';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({});
  }
  async findOneCategory(id: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
  }
  async createCategory(params: NewCategory): Promise<Category> {
    return this.prisma.category.create({
      data: {
        ...params,
      },
    });
  }

  async updateCategory(params: UpdateCategory): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
